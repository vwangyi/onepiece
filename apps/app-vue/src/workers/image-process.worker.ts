/// <reference lib="webworker" />
/**
 * image-process.worker.ts —— 图像处理 Worker（OpenCV + WebAssembly）
 *
 * 承担四件事，与《图像处理技术讲解》文档一一对应：
 *
 *  1. WebAssembly
 *     OpenCV 官方发布的 opencv.js 就是 Emscripten 把 OpenCV C++ 编译成
 *     WebAssembly 的产物（wasm 已 base64 内嵌在单个 js 文件中）。
 *     本 Worker 动态 import 它并在独立线程中执行。
 *
 *  2. Web Worker
 *     OpenCV 的算子全是计算密集型任务。放在 Worker 里执行，
 *     主线程只负责采集帧与调度，不会被像素运算阻塞，交互始终流畅。
 *
 *  3. OffscreenCanvas
 *     结果画布在 init 阶段就 transferControlToOffscreen() 交给本 Worker。
 *     Worker 直接在 OffscreenCanvas 上绘制，处理结果无需回传主线程。
 *
 *  4. requestIdleCallback
 *     由主线程调度：本 Worker 收到消息后立即执行，不占用主线程空闲时间。
 */
import {
  loadOpenCV,
  opencvVersion,
  detectRectWithOpenCV,
  perspectiveCorrect,
  runOpenCVPipeline,
  sobelPreview,
  type OpenCvOptimizeOptions,
  type OpenCvDetectResult,
  type Rect,
  type StepTiming
} from '../wasm/opencv-image-processing';

// ---------------------------------------------------------------------------
// 消息协议
// ---------------------------------------------------------------------------

export interface InitMessage {
  type: 'init';
  /** OffscreenCanvas 或 null */
  canvas: OffscreenCanvas | null;
}

export interface DetectMessage {
  type: 'detect';
  id: number;
  data: ArrayBuffer;
  width: number;
  height: number;
}

export interface ProcessMessage {
  type: 'process';
  id: number;
  data: ArrayBuffer;
  width: number;
  height: number;
  rect: Rect | null;
  /** 巡边角点（4 点，左上/右上/右下/左下），有值且开启透视校正时会做拉正 */
  corners: Array<{ x: number; y: number }> | null;
  options: OpenCvOptimizeOptions;
}

export interface PreviewEdgeMessage {
  type: 'preview-edge';
  id: number;
  data: ArrayBuffer;
  width: number;
  height: number;
}

export type WorkerRequest =
  InitMessage | DetectMessage | ProcessMessage | PreviewEdgeMessage;

export interface InitResult {
  type: 'init-done';
  supportsOffscreen: boolean;
  opencvVersion: string;
  loadMs: number;
}

export interface DetectResultMessage {
  type: 'detect-done';
  id: number;
  rect: Rect | null;
  corners: Array<{ x: number; y: number }> | null;
  isQuad: boolean;
  confidence: number;
  elapsed: number;
}

export interface ProcessResultMessage {
  type: 'process-done';
  id: number;
  width: number;
  height: number;
  timings: StepTiming[];
  total: number;
  blob: Blob | null;
  byteLength: number;
}

export interface EdgePreviewMessage {
  type: 'edge-done';
  id: number;
  width: number;
  height: number;
}

export interface ErrorMessage {
  type: 'error';
  id?: number;
  message: string;
}

export type WorkerResponse =
  | { type: 'wasm-ready'; opencvVersion: string }
  | InitResult
  | DetectResultMessage
  | ProcessResultMessage
  | EdgePreviewMessage
  | ErrorMessage;

const ctx = self as unknown as DedicatedWorkerGlobalScope;

/** 结果画布（OffscreenCanvas），由主线程 transfer 过来 */
let displayCanvas: OffscreenCanvas | null = null;
let displayCtx: OffscreenCanvasRenderingContext2D | null = null;

/** OpenCV 加载完成的标记 */
let ready = false;

async function ensureOpenCV(): Promise<void> {
  if (ready) return;
  await loadOpenCV();
  ready = true;
  postMessage({
    type: 'wasm-ready',
    opencvVersion: opencvVersion()
  } satisfies WorkerResponse);
}

// ---------------------------------------------------------------------------
// OffscreenCanvas
// ---------------------------------------------------------------------------

function setupCanvas(canvas: OffscreenCanvas | null): boolean {
  if (!canvas) {
    displayCanvas = null;
    displayCtx = null;
    return false;
  }
  displayCanvas = canvas;
  displayCtx = canvas.getContext('2d');
  return displayCtx !== null;
}

/**
 * 直接在 OffscreenCanvas 上绘制处理结果。
 * 这是文档里「不需要把处理后的图像数据传回主线程」的关键：
 * Worker 持有画布，绘制后浏览器自动更新页面显示。
 */
function paintToDisplay(image: ImageData): void {
  if (!displayCanvas || !displayCtx) return;
  if (displayCanvas.width !== image.width) displayCanvas.width = image.width;
  if (displayCanvas.height !== image.height)
    displayCanvas.height = image.height;
  displayCtx.putImageData(image, 0, 0);
}

/** ImageData -> PNG Blob（在 Worker 内完成，不经过主线程） */
async function toBlob(image: ImageData): Promise<Blob | null> {
  if (typeof OffscreenCanvas === 'undefined') return null;
  try {
    const oc = new OffscreenCanvas(image.width, image.height);
    const c = oc.getContext('2d');
    if (!c) return null;
    c.putImageData(image, 0, 0);
    return await oc.convertToBlob({ type: 'image/png' });
  } catch {
    return null;
  }
}

/** ArrayBuffer -> ImageData（不做拷贝，直接建立视图） */
function toImageData(
  buffer: ArrayBuffer,
  width: number,
  height: number
): ImageData {
  return new ImageData(new Uint8ClampedArray(buffer), width, height);
}

// ---------------------------------------------------------------------------
// 业务处理
// ---------------------------------------------------------------------------

/** 自动巡边 */
async function handleDetect(msg: DetectMessage): Promise<void> {
  const started = performance.now();
  const image = toImageData(msg.data, msg.width, msg.height);
  const result: OpenCvDetectResult = detectRectWithOpenCV(image);

  postMessage({
    type: 'detect-done',
    id: msg.id,
    rect: result.rect,
    corners: result.corners,
    isQuad: result.isQuad,
    confidence: result.confidence,
    elapsed: performance.now() - started
  } satisfies DetectResultMessage);
}

/**
 * 裁剪（或透视校正）+ 图像优化。
 *
 * 流程：
 *   1. 整帧像素交给 OpenCV
 *   2. 若拿到四角且开启透视校正，先把倾斜文档拉正；否则按矩形裁剪
 *   3. 在裁剪结果上跑优化流水线
 *   4. 结果直接画进 OffscreenCanvas，并生成 Blob 供下载
 */
async function handleProcess(msg: ProcessMessage): Promise<void> {
  const frame = toImageData(msg.data, msg.width, msg.height);

  // 1. 裁剪 / 透视校正
  let cropped: ImageData;
  if (msg.corners && msg.corners.length === 4 && msg.options.perspective) {
    cropped = perspectiveCorrect(frame, msg.corners);
  } else if (msg.rect && msg.rect.width > 0 && msg.rect.height > 0) {
    cropped = cropImageData(frame, msg.rect);
  } else {
    cropped = frame;
  }

  if (!cropped || cropped.width < 1 || cropped.height < 1) {
    postMessage({
      type: 'error',
      id: msg.id,
      message: '裁剪失败：矩形区域无效'
    } satisfies ErrorMessage);
    return;
  }

  // 2. 优化流水线
  const result = runOpenCVPipeline(cropped, msg.options);

  // 3. 直接绘制到 OffscreenCanvas —— 无需回传像素数据
  paintToDisplay(result.image);

  // 4. 生成 Blob 供下载
  const blob = await toBlob(result.image);

  postMessage({
    type: 'process-done',
    id: msg.id,
    width: result.image.width,
    height: result.image.height,
    timings: result.timings,
    total: result.total,
    blob,
    byteLength: result.image.width * result.image.height * 4
  } satisfies ProcessResultMessage);
}

/**
 * 矩形裁剪。
 * OpenCV 没有直接的"按矩形裁剪"语法，这里用 Mat + copyMakeBorder/ROI 组合，
 * 为保持可控这里直接用 typed array 实现（仅搬运像素，不做算法运算）。
 */
function cropImageData(source: ImageData, rect: Rect): ImageData {
  const sw = source.width;
  const sh = source.height;
  const x0 = Math.max(0, Math.min(rect.x, sw - 1));
  const y0 = Math.max(0, Math.min(rect.y, sh - 1));
  const x1 = Math.max(x0 + 1, Math.min(rect.x + rect.width, sw));
  const y1 = Math.max(y0 + 1, Math.min(rect.y + rect.height, sh));
  const w = x1 - x0;
  const h = y1 - y0;

  const out = new ImageData(w, h);
  const src = source.data;
  const dst = out.data;
  for (let y = 0; y < h; y++) {
    const srcStart = ((y0 + y) * sw + x0) * 4;
    dst.set(src.subarray(srcStart, srcStart + w * 4), y * w * 4);
  }
  return out;
}

/** 边缘可视化预览（Sobel） */
async function handleEdgePreview(msg: PreviewEdgeMessage): Promise<void> {
  const image = toImageData(msg.data, msg.width, msg.height);
  const edge = sobelPreview(image);
  paintToDisplay(edge);
  postMessage({
    type: 'edge-done',
    id: msg.id,
    width: edge.width,
    height: edge.height
  } satisfies EdgePreviewMessage);
}

// ---------------------------------------------------------------------------
// 消息分发
// ---------------------------------------------------------------------------

ctx.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const msg = event.data;
  try {
    switch (msg.type) {
      case 'init': {
        const hasCanvas = setupCanvas(msg.canvas);
        const t0 = performance.now();
        await ensureOpenCV();
        postMessage({
          type: 'init-done',
          supportsOffscreen: hasCanvas,
          opencvVersion: opencvVersion(),
          loadMs: performance.now() - t0
        } satisfies InitResult);
        break;
      }
      case 'detect':
        await ensureOpenCV();
        await handleDetect(msg);
        break;
      case 'process':
        await ensureOpenCV();
        await handleProcess(msg);
        break;
      case 'preview-edge':
        await ensureOpenCV();
        await handleEdgePreview(msg);
        break;
      default: {
        postMessage({
          type: 'error',
          message: `未知消息类型: ${(msg as { type: string }).type}`
        } satisfies ErrorMessage);
      }
    }
  } catch (err) {
    const id = 'id' in msg ? (msg as { id?: number }).id : undefined;
    const errorMessage: ErrorMessage = {
      type: 'error',
      message: err instanceof Error ? err.message : String(err)
    };
    if (id !== undefined) errorMessage.id = id;
    postMessage(errorMessage);
  }
};

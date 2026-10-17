/**
 * useImageScanner.ts —— 摄像头采集 + 自动巡边 + 图像优化的主线程编排
 *
 * 这个 composable 只做三件事：
 *   1. 管理摄像头与视频帧采集
 *   2. 用 requestIdleCallback 把数据投递安排到浏览器空闲期
 *   3. 与 Worker 通信，并维护响应式状态
 *
 * 像素运算（OpenCV / WebAssembly）全部发生在 Worker 内，主线程不参与。
 */
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import type {
  OpenCvOptimizeOptions,
  Rect,
  StepTiming
} from '../wasm/opencv-image-processing';
import type {
  WorkerRequest,
  WorkerResponse
} from '../workers/image-process.worker';

/** 巡边检测的降采样宽度：越小越快，160~320 之间比较稳 */
const DETECT_WIDTH = 240;

/** requestIdleCallback 能力检测（Safari 未实现，需退化处理） */
const ric =
  typeof globalThis.requestIdleCallback === 'function'
    ? globalThis.requestIdleCallback.bind(globalThis)
    : undefined;
const cic =
  typeof globalThis.cancelIdleCallback === 'function'
    ? globalThis.cancelIdleCallback.bind(globalThis)
    : undefined;

/**
 * 在浏览器空闲时执行任务。
 * Safari 退化为 setTimeout(0)，保证功能可用。
 * 返回取消函数；若任务已开始执行则取消无效。
 */
export function whenIdle(cb: () => void, timeout = 200): () => void {
  let cancelled = false;
  const run = () => {
    if (cancelled) return;
    cancelled = true;
    cb();
  };
  if (ric) {
    const handle = ric(run, { timeout });
    return () => {
      cancelled = true;
      cic?.(handle);
    };
  }
  const t = setTimeout(run, 0);
  return () => {
    cancelled = true;
    clearTimeout(t);
  };
}

/** 巡边状态 */
export type DetectStatus = 'idle' | 'detecting' | 'found' | 'lost';

export interface ScanStats {
  /** 巡边单帧耗时（Worker 内，含 OpenCV 轮廓分析） */
  detectMs: number;
  /** 优化流水线各步骤耗时 */
  timings: StepTiming[];
  /** 优化总耗时 */
  processMs: number;
  /** 主线程发出 -> Worker 完成的端到端延迟 */
  roundTripMs: number;
  outputWidth: number;
  outputHeight: number;
  /** OpenCV 版本 */
  opencvVersion: string;
  /** OpenCV 模块加载耗时 */
  opencvLoadMs: number;
}

export function useImageScanner() {
  // ---- 基础状态 ----
  const videoRef = shallowRef<HTMLVideoElement | null>(null);
  const resultCanvasRef = shallowRef<HTMLCanvasElement | null>(null);
  const stream = shallowRef<MediaStream | null>(null);

  const ready = ref(false);
  const cameraOn = ref(false);
  const error = ref('');
  const supportsOffscreen = ref(true);

  const rect = ref<Rect | null>(null);
  const corners = ref<Array<{ x: number; y: number }> | null>(null);
  const isQuad = ref(false);
  const confidence = ref(0);
  const detectStatus = ref<DetectStatus>('idle');
  const processing = ref(false);
  const showEdgePreview = ref(false);

  /**
   * 视频尺寸版本号。
   *
   * video.videoWidth / videoHeight 是 DOM 属性，不是响应式的，
   * 依赖它们的 computed 不会在尺寸就绪时重算。
   * 这里用一个自增计数器做"信号"，每次拿到有效尺寸就 +1，
   * 让依赖它的 computed 重新执行。
   */
  const videoSizeVersion = ref(0);

  const resultUrl = ref('');
  const stats = ref<ScanStats>({
    detectMs: 0,
    timings: [],
    processMs: 0,
    roundTripMs: 0,
    outputWidth: 0,
    outputHeight: 0,
    opencvVersion: '',
    opencvLoadMs: 0
  });

  let worker: Worker | null = null;
  let rafId = 0;
  /** 巡边任务的 idle 句柄（与出图任务相互独立） */
  let detectIdleCancel: (() => void) | null = null;
  /** 出图任务的 idle 句柄 */
  let processIdleCancel: (() => void) | null = null;
  let lastDetectAt = 0;
  let detectSeq = 0;
  let processSeq = 0;
  const pendingProcesses = new Map<number, number>();
  let cameraStarting = false;

  // -------------------------------------------------------------------------
  // Worker 初始化
  // -------------------------------------------------------------------------

  function post(msg: WorkerRequest, transfer: Transferable[] = []): void {
    worker?.postMessage(msg, transfer);
  }

  function initWorker(): Worker | null {
    if (worker) return worker;

    const canvas = resultCanvasRef.value;
    let offscreen: OffscreenCanvas | null = null;
    if (canvas && typeof canvas.transferControlToOffscreen === 'function') {
      // 把画布控制权交给 Worker：之后 Worker 绘制即自动显示，
      // 主线程不需要接收任何像素数据。
      offscreen = canvas.transferControlToOffscreen();
    } else {
      supportsOffscreen.value = false;
    }

    worker = new Worker(
      new URL('../workers/image-process.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const msg = event.data;
      switch (msg.type) {
        case 'init-done':
          supportsOffscreen.value = msg.supportsOffscreen;
          stats.value = {
            ...stats.value,
            opencvVersion: msg.opencvVersion,
            opencvLoadMs: msg.loadMs
          };
          ready.value = true;
          break;

        case 'wasm-ready':
          stats.value = { ...stats.value, opencvVersion: msg.opencvVersion };
          break;

        case 'detect-done':
          // 过期结果直接丢弃：巡边高频触发，旧帧没有展示价值
          if (msg.id < detectSeq) return;
          stats.value = { ...stats.value, detectMs: msg.elapsed };
          confidence.value = msg.confidence;
          isQuad.value = msg.isQuad;
          if (msg.rect) {
            rect.value = msg.rect;
            corners.value = msg.corners;
            detectStatus.value = 'found';
          } else {
            rect.value = null;
            corners.value = null;
            detectStatus.value = 'lost';
          }
          break;

        case 'process-done': {
          const sentAt = pendingProcesses.get(msg.id);
          pendingProcesses.delete(msg.id);
          if (sentAt === undefined) return;

          if (resultUrl.value) {
            URL.revokeObjectURL(resultUrl.value);
            resultUrl.value = '';
          }
          if (msg.blob) {
            resultUrl.value = URL.createObjectURL(msg.blob);
          }
          stats.value = {
            ...stats.value,
            timings: msg.timings,
            processMs: msg.total,
            roundTripMs: performance.now() - sentAt,
            outputWidth: msg.width,
            outputHeight: msg.height
          };
          processing.value = false;
          break;
        }

        case 'edge-done':
          break;

        case 'error':
          error.value = msg.message;
          processing.value = false;
          detectStatus.value = 'idle';
          break;
        default:
          break;
      }
    };

    worker.onerror = (e: ErrorEvent) => {
      error.value = `Worker 异常: ${e.message}`;
      processing.value = false;
    };

    post({ type: 'init', canvas: offscreen }, offscreen ? [offscreen] : []);
    return worker;
  }

  // -------------------------------------------------------------------------
  // 摄像头
  // -------------------------------------------------------------------------

  async function startCamera(): Promise<void> {
    if (cameraStarting || cameraOn.value) return;
    cameraStarting = true;
    error.value = '';

    const video = videoRef.value;
    if (!video) {
      error.value = '找不到 video 元素';
      cameraStarting = false;
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      error.value =
        '当前环境不支持摄像头采集。摄像头需要 HTTPS 或 localhost 环境。';
      cameraStarting = false;
      return;
    }

    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });
      stream.value = media;
      video.srcObject = media;
      video.setAttribute('playsinline', 'true');
      video.muted = true;
      await video.play();
      cameraOn.value = true;
      // 尺寸就绪后触发一次，让依赖 videoWidth/videoHeight 的 computed 重算
      videoSizeVersion.value++;
      initWorker();
      startDetectLoop();
    } catch (err) {
      const name = err instanceof DOMException ? err.name : '';
      error.value =
        name === 'NotAllowedError'
          ? '摄像头权限被拒绝，请在浏览器地址栏允许摄像头访问'
          : name === 'NotFoundError'
            ? '未检测到摄像头设备'
            : `摄像头启动失败: ${err instanceof Error ? err.message : String(err)}`;
    } finally {
      cameraStarting = false;
    }
  }

  function stopCamera(): void {
    cancelDetectLoop();
    stream.value?.getTracks().forEach(t => t.stop());
    stream.value = null;
    const video = videoRef.value;
    if (video) video.srcObject = null;
    cameraOn.value = false;
    rect.value = null;
    corners.value = null;
    detectStatus.value = 'idle';
  }

  // -------------------------------------------------------------------------
  // 自动巡边
  // -------------------------------------------------------------------------

  /** 巡边用的降采样画布 */
  let detectCanvas: HTMLCanvasElement | null = null;
  let detectCtx: CanvasRenderingContext2D | null = null;
  /** 出图用的画布，与巡边画布分开，避免互相 resize */
  let captureCanvas: HTMLCanvasElement | null = null;

  function ensureDetectCanvas(
    w: number,
    h: number
  ): CanvasRenderingContext2D | null {
    if (!detectCanvas) detectCanvas = document.createElement('canvas');
    if (detectCanvas.width !== w || detectCanvas.height !== h) {
      detectCanvas.width = w;
      detectCanvas.height = h;
      // 尺寸变化会让旧的 ctx 失效，必须重新获取
      detectCtx = null;
    }
    if (!detectCtx) {
      detectCtx = detectCanvas.getContext('2d', {
        willReadFrequently: true
      });
    }
    return detectCtx;
  }

  /**
   * 自动巡边循环。
   * 每帧先降采样，再通过 requestIdleCallback 投递，
   * 确保投递不抢占用户交互（滚动、点击）的执行时机。
   */
  function startDetectLoop(): void {
    cancelDetectLoop();

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!cameraOn.value || !worker) return;

      const now = performance.now();
      // 节流：巡边不需要每帧都做，120ms 一次足够跟手
      if (now - lastDetectAt < 120) return;

      const video = videoRef.value;
      if (!video || video.readyState < 2 || !video.videoWidth) return;

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;
      // 首次拿到有效尺寸时通知一次，让页面上的红框开始显示
      if (videoSizeVersion.value === 0) {
        videoSizeVersion.value++;
      }

      const dw = DETECT_WIDTH;
      const dh = Math.max(1, Math.round((vh / vw) * dw));
      const ctx2d = ensureDetectCanvas(dw, dh);
      if (!ctx2d) return;

      ctx2d.drawImage(video, 0, 0, dw, dh);
      const frame = ctx2d.getImageData(0, 0, dw, dh);

      lastDetectAt = now;
      const id = ++detectSeq;

      // requestIdleCallback：把跨线程数据投递安排在浏览器空闲时。
      // 注意：巡边与出图必须用各自独立的 idle 句柄。
      // 巡边每 120ms 触发一次，若与出图共用一个句柄，
      // 巡边会在出图任务执行前把它取消掉，导致「点了没反应」。
      detectIdleCancel?.();
      detectIdleCancel = whenIdle(() => {
        detectIdleCancel = null;
        try {
          // 转移 ArrayBuffer 所有权实现零拷贝；转移后原引用失效，这是有意为之
          post(
            {
              type: 'detect',
              id,
              data: frame.data.buffer,
              width: dw,
              height: dh
            },
            [frame.data.buffer]
          );
        } catch (err) {
          error.value = `巡边提交失败: ${
            err instanceof Error ? err.message : String(err)
          }`;
        }
      });
    };

    rafId = requestAnimationFrame(tick);
  }

  function cancelDetectLoop(): void {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    detectIdleCancel?.();
    detectIdleCancel = null;
  }

  // -------------------------------------------------------------------------
  // 出图 + 图像优化
  // -------------------------------------------------------------------------

  /** 巡边坐标（基于降采样图）-> 视频原始分辨率坐标 */
  function scaleRect(r: Rect): Rect {
    const video = videoRef.value;
    if (!video || !video.videoWidth) return r;
    const scale = video.videoWidth / DETECT_WIDTH;
    const x = Math.max(0, Math.round(r.x * scale));
    const y = Math.max(0, Math.round(r.y * scale));
    return {
      x,
      y,
      width: Math.max(
        1,
        Math.min(video.videoWidth - x, Math.round(r.width * scale))
      ),
      height: Math.max(
        1,
        Math.min(video.videoHeight - y, Math.round(r.height * scale))
      )
    };
  }

  /** 角点缩放到原始分辨率 */
  function scaleCorners(
    pts: Array<{ x: number; y: number }>
  ): Array<{ x: number; y: number }> {
    const video = videoRef.value;
    if (!video || !video.videoWidth) return pts;
    const scale = video.videoWidth / DETECT_WIDTH;
    return pts.map(p => ({
      x: Math.round(p.x * scale),
      y: Math.round(p.y * scale)
    }));
  }

  /**
   * 抓取当前帧，按巡边结果裁剪（或透视校正）出图，并在 Worker 内完成优化。
   */
  function capture(
    options: OpenCvOptimizeOptions,
    useDetectedRect = true
  ): void {
    const video = videoRef.value;
    if (!video || !cameraOn.value || !worker) {
      error.value = '请先开启摄像头';
      return;
    }
    if (video.readyState < 2 || !video.videoWidth) {
      error.value = '视频尚未就绪';
      return;
    }

    processing.value = true;
    error.value = '';

    const vw = video.videoWidth;
    const vh = video.videoHeight;

    // 全分辨率抓帧。必须用独立画布：巡边循环正在使用 detectCanvas，
    // 共用时出图的 resize 会破坏巡边正在取的帧。
    if (!captureCanvas) captureCanvas = document.createElement('canvas');
    captureCanvas.width = vw;
    captureCanvas.height = vh;
    const ctx2d = captureCanvas.getContext('2d', {
      willReadFrequently: true
    });
    if (!ctx2d) {
      error.value = '无法创建画布上下文';
      processing.value = false;
      return;
    }
    ctx2d.drawImage(video, 0, 0, vw, vh);
    const frame = ctx2d.getImageData(0, 0, vw, vh);

    // 未检测到矩形时退化为居中 80% 区域，保证按钮始终可用
    let sourceRect: Rect | null = null;
    let sourceCorners: Array<{ x: number; y: number }> | null = null;

    if (useDetectedRect && rect.value) {
      sourceRect = scaleRect(rect.value);
      sourceCorners =
        isQuad.value && corners.value ? scaleCorners(corners.value) : null;
    } else {
      const w = Math.round(vw * 0.8);
      const h = Math.round(vh * 0.8);
      sourceRect = {
        x: Math.round((vw - w) / 2),
        y: Math.round((vh - h) / 2),
        width: w,
        height: h
      };
      sourceCorners = null;
    }

    const id = ++processSeq;
    const sentAt = performance.now();
    pendingProcesses.set(id, sentAt);

    // 关键：options 来自 Vue 的 reactive()，是一个 Proxy。
    // postMessage 走结构化克隆算法，无法克隆 Proxy 对象，
    // 直接传会抛 DataCloneError（表现为"点了按钮没反应"）。必须先摊平。
    const plainOptions: OpenCvOptimizeOptions = { ...options };

    // 用 requestIdleCallback 投递大块数据（1080p 一帧约 8MB），避免瞬时占用主线程。
    processIdleCancel?.();
    processIdleCancel = whenIdle(() => {
      processIdleCancel = null;
      try {
        post(
          {
            type: 'process',
            id,
            data: frame.data.buffer,
            width: vw,
            height: vh,
            rect: sourceRect,
            corners: sourceCorners,
            options: plainOptions
          },
          [frame.data.buffer]
        );
      } catch (err) {
        processing.value = false;
        error.value = `提交图像处理任务失败: ${
          err instanceof Error ? err.message : String(err)
        }`;
      }
    });
  }

  /** 切换边缘可视化（Sobel），便于调参 */
  function toggleEdgePreview(): void {
    const next = !showEdgePreview.value;
    showEdgePreview.value = next;
    if (!next) return;

    const video = videoRef.value;
    if (!video || !cameraOn.value || !worker) return;
    if (video.readyState < 2 || !video.videoWidth) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    // 边缘预览降采样到 480px 宽，足够看清边缘且不阻塞
    const dw = DETECT_WIDTH * 2;
    const dh = Math.max(1, Math.round((vh / vw) * dw));

    if (!captureCanvas) captureCanvas = document.createElement('canvas');
    captureCanvas.width = dw;
    captureCanvas.height = dh;
    const ctx2d = captureCanvas.getContext('2d', {
      willReadFrequently: true
    });
    if (!ctx2d) return;
    ctx2d.drawImage(video, 0, 0, dw, dh);
    const small = ctx2d.getImageData(0, 0, dw, dh);

    try {
      post(
        {
          type: 'preview-edge',
          id: ++detectSeq,
          data: small.data.buffer,
          width: dw,
          height: dh
        },
        [small.data.buffer]
      );
    } catch (err) {
      error.value = `边缘预览提交失败: ${
        err instanceof Error ? err.message : String(err)
      }`;
    }
  }

  /** 下载当前结果 */
  function download(): void {
    if (!resultUrl.value) return;
    const a = document.createElement('a');
    a.href = resultUrl.value;
    a.download = `scan-${Date.now()}.png`;
    a.click();
  }

  function reset(): void {
    if (resultUrl.value) {
      URL.revokeObjectURL(resultUrl.value);
      resultUrl.value = '';
    }
    stats.value = {
      detectMs: 0,
      timings: [],
      processMs: 0,
      roundTripMs: 0,
      outputWidth: 0,
      outputHeight: 0,
      opencvVersion: stats.value.opencvVersion,
      opencvLoadMs: 0
    };
    processing.value = false;
  }

  onBeforeUnmount(() => {
    cancelDetectLoop();
    stopCamera();
    worker?.terminate();
    worker = null;
    if (resultUrl.value) {
      URL.revokeObjectURL(resultUrl.value);
      resultUrl.value = '';
    }
  });

  return {
    videoRef,
    resultCanvasRef,
    ready,
    cameraOn,
    cameraStarting,
    error,
    supportsOffscreen,
    rect,
    corners,
    isQuad,
    confidence,
    detectStatus,
    processing,
    resultUrl,
    stats,
    showEdgePreview,
    videoSizeVersion,
    startCamera,
    stopCamera,
    capture,
    toggleEdgePreview,
    download,
    reset
  };
}

export type UseImageScanner = ReturnType<typeof useImageScanner>;

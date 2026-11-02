/**
 * opencv-image-processing.ts —— 基于 OpenCV.js 的图像处理封装
 *
 * 对应技术文档中「借助 Emscripten 将 OpenCV 编译为 WebAssembly」这一步。
 * 实际使用的是 OpenCV 官方发布的 opencv.js（Emscripten 编译产物），
 * wasm 已内嵌在单文件里，Worker 内 import 即可加载，无需额外请求 .wasm。
 *
 * 设计要点：
 *  1. Mat 生命周期管理：OpenCV 的 Mat 由 wasm 堆分配，必须显式 delete()，
 *     否则多帧处理会持续泄漏显存 —— 这是接入 OpenCV 最容易踩的坑。
 *  2. 零拷贝接入：cv.matFromImageData 直接接管 ImageData 的底层缓冲，
 *     避免在 JS 堆与 wasm 堆之间反复复制整幅图像。
 *  3. 结果回传：cv.imshow 不可用（那是 HighGUI），改用 matToImageData
 *     或直接读 Mat 的 data 指针。
 */

/** 矩形框，坐标为像素 */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** 单个步骤的耗时统计 */
export interface StepTiming {
  name: string;
  ms: number;
}

/** OpenCV 的 Mat 类型（只声明用到的部分，避免引入 13MB 包的完整 .d.ts） */
export interface CvMat {
  rows: number;
  cols: number;
  data: Uint8Array;
  data32S: Int32Array;
  /** Mat 的通道数与深度打包值，如 CV_8UC4 */
  type(): number;
  /**
   * 转换到目标类型并做线性变换：dst = src * alpha + beta。
   * OpenCV 5.0 中这是 Mat 的实例方法（4.x 的 cv::Mat::convertTo）。
   */
  convertTo(dst: CvMat, rtype: number, alpha?: number, beta?: number): void;
  create(...args: unknown[]): void;
  delete(): void;
  clone(): CvMat;
}

/** OpenCV 主命名空间（按需声明，避免 13MB 包的完整类型） */
export interface Cv {
  Mat: new (...args: unknown[]) => CvMat;
  MatVector: new () => {
    size(): number;
    get(i: number): CvMat;
    delete(): void;
  };
  Size: new (w: number, h: number) => unknown;
  Scalar: new (...args: number[]) => unknown;
  matFromImageData(image: ImageData): CvMat;
  matToImageData(mat: CvMat): ImageData;
  cvtColor(src: CvMat, dst: CvMat, code: number): void;
  cvtColor(src: CvMat, dst: CvMat, srcCn: number, dstCn: number): void;
  GaussianBlur(src: CvMat, dst: CvMat, ksize: unknown, sigmaX: number): void;
  blur(src: CvMat, dst: CvMat, ksize: unknown): void;
  medianBlur(src: CvMat, dst: CvMat, ksize: number): void;
  threshold(
    src: CvMat,
    dst: CvMat,
    thresh: number,
    maxval: number,
    type: number
  ): void;
  adaptiveThreshold(
    src: CvMat,
    dst: CvMat,
    maxValue: number,
    adaptiveMethod: number,
    thresholdType: number,
    blockSize: number,
    C: number
  ): void;
  equalizeHist(src: CvMat, dst: CvMat): void;
  filter2D(
    src: CvMat,
    dst: CvMat,
    ddepth: number,
    kernel: CvMat,
    anchor: unknown,
    delta?: number,
    borderType?: number
  ): void;
  /** 从一维数组构造 Mat（OpenCV.js 提供，5.0 起不再有 createMatKernel） */
  matFromArray(rows: number, cols: number, type: number, data: number[]): CvMat;
  Point: new (x: number, y: number) => unknown;
  bitwise_not(src: CvMat, dst: CvMat, mask?: CvMat): void;
  magnitude(x: CvMat, y: CvMat, magnitude: CvMat): void;
  normalize(
    src: CvMat,
    dst: CvMat,
    alpha: number,
    beta: number,
    normType: number,
    dtype?: number
  ): void;
  Sobel(
    src: CvMat,
    dst: CvMat,
    ddepth: number,
    dx: number,
    dy: number,
    ksize: number,
    scale?: number,
    delta?: number,
    borderType?: number
  ): void;
  boundingRect(contour: CvMat): {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  Canny(
    image: CvMat,
    edges: CvMat,
    threshold1: number,
    threshold2: number
  ): void;
  findContours(
    image: CvMat,
    contours: unknown,
    hierarchy: CvMat,
    mode: number,
    method: number
  ): void;
  contourArea(contour: CvMat): number;
  boundingRect(contour: CvMat): {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  arcLength(curve: CvMat, closed: boolean): number;
  approxPolyDP(
    curve: CvMat,
    approxCurve: CvMat,
    epsilon: number,
    closed: boolean
  ): void;
  getPerspectiveTransform(src: CvMat, dst: CvMat, m: CvMat): void;
  getPerspectiveTransform(src: number[][], dst: number[][], m: CvMat): void;
  warpPerspective(
    src: CvMat,
    dst: CvMat,
    m: CvMat,
    dsize: unknown,
    flags: number,
    borderMode: number,
    borderValue: unknown
  ): void;
  copyMakeBorder(
    src: CvMat,
    dst: CvMat,
    top: number,
    bottom: number,
    left: number,
    right: number,
    borderType: number,
    value: unknown
  ): void;
  rotate(src: CvMat, dst: CvMat, rotateCode: number): void;
  getBuildInformation?(): string;
  // 常量
  CV_8UC1: number;
  CV_8UC3: number;
  CV_8UC4: number;
  CV_32F: number;
  CV_32FC1: number;
  CV_32FC2: number;
  NORM_MINMAX: number;
  COLOR_RGBA2GRAY: number;
  COLOR_RGBA2RGB: number;
  COLOR_GRAY2RGBA: number;
  BORDER_CONSTANT: number;
  BORDER_REPLICATE: number;
  THRESH_BINARY: number;
  THRESH_OTSU: number;
  ADAPTIVE_THRESH_MEAN_C: number;
  ADAPTIVE_THRESH_GAUSSIAN_C: number;
  RETR_LIST: number;
  RETR_EXTERNAL: number;
  CHAIN_APPROX_SIMPLE: number;
  INTER_LINEAR: number;
  WARP_INVERSE_MAP: number;
  ROTATE_90_CLOCKWISE: number;
}

/** 已加载的 OpenCV 实例 */
let cvInstance: Cv | null = null;
let loadingPromise: Promise<Cv> | null = null;

/**
 * OpenCV 脚本的 URL。
 *
 * 优先用 Vite 的 `?url` 导入 —— 它会把 12MB 的 UMD 文件原样拷贝到产物目录，
 * 不做任何打包解析。若该导入失败（例如在 Node 测试环境），
 * 回退到裸模块 specifier，由调用方的加载逻辑处理。
 */
async function resolveOpenCvUrl(): Promise<string> {
  try {
    const mod = await import('@techstark/opencv-js/dist/opencv.js?url');
    const url = (mod as { default?: unknown }).default;
    if (typeof url === 'string') return url;
  } catch {
    // 落到下面的回退分支
  }
  return '@techstark/opencv-js';
}

/**
 * 加载 OpenCV。
 *
 * 关键点：opencv.js 是一个 12.7MB 的 **UMD** 包（wasm 已 base64 内嵌），
 * 不能被 Vite 当作 ESM 静态分析 —— 强行 parse 会报 Rollup 语法错误。
 * 所以用 `?url` 让 Vite 原样产出资源文件，再在运行时加载：
 *   - 主线程：<script> 标签，UMD 挂到 window.cv
 *   - Worker：动态 import()，UMD 走 globalThis.cv 分支
 *   - Node（测试）：import 拿 module.exports
 *
 * 注意两点：
 *  1. module worker 里不能用 importScripts（浏览器会抛错），必须用 import()；
 *  2. UMD 的 factory 返回 Promise（wasm 异步实例化），拿到后还要 await。
 */
async function loadUmdScript(url: string): Promise<Cv> {
  // ---- Node 环境（仅测试用）----
  if (typeof process !== 'undefined' && !!process.versions?.node) {
    const specifier = url.startsWith('@')
      ? url
      : url.replace(/^.*opencv\.js$/, '@techstark/opencv-js');
    const mod = (await import(/* @vite-ignore */ specifier)) as unknown;
    const raw = (mod as { default?: unknown }).default ?? mod;
    if (typeof (raw as Promise<Cv>).then === 'function') {
      return await (raw as Promise<Cv>);
    }
    return raw as Cv;
  }

  const globalScope = globalThis as unknown as { cv?: Cv | Promise<Cv> };
  if (globalScope.cv) return await globalScope.cv;

  const hasDocument =
    typeof (globalThis as { document?: unknown }).document !== 'undefined';

  if (hasDocument) {
    // ---- 浏览器主线程：script 标签 ----
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`加载 OpenCV 脚本失败: ${url}`));
      document.head.appendChild(script);
    });
  } else {
    // ---- Worker（含 module worker）：动态 import ----
    // module worker 不支持 importScripts，但 import() 可用。
    // UMD 在没有 module/exports/define 的环境会走 `root.cv = factory()`，
    // 这里的 root 就是 globalThis。
    await import(/* @vite-ignore */ url);
  }

  const cv = globalScope.cv;
  if (!cv) {
    throw new Error('OpenCV 脚本已加载但未暴露 cv 对象');
  }
  // factory 返回的是 Promise，需要 await 才能拿到真正的 API
  return await cv;
}

/**
 * 加载 OpenCV 并返回实例。
 * 结果会被缓存，多次调用共享同一个 Promise。
 */
export async function loadOpenCV(): Promise<Cv> {
  if (cvInstance) return cvInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const url = await resolveOpenCvUrl();
    const cv = await loadUmdScript(url);
    cvInstance = cv;
    return cv;
  })();

  return loadingPromise;
}

export function opencvLoaded(): boolean {
  return cvInstance !== null;
}

/** OpenCV 版本信息，用于页面展示 */
export function opencvVersion(): string {
  if (!cvInstance) return '未加载';
  try {
    const info = cvInstance.getBuildInformation?.();
    const m = info?.match(/Version control:\s*(.+)/);
    return m?.[1]?.trim() || '已加载';
  } catch {
    return '已加载';
  }
}

// ---------------------------------------------------------------------------
// RAII 辅助：自动释放 Mat，避免手动 delete 遗漏导致显存泄漏
// ---------------------------------------------------------------------------

/** 收集一组 Mat，在作用域结束时统一释放 */
class MatPool {
  private mats: CvMat[] = [];

  track<T extends CvMat>(m: T): T {
    this.mats.push(m);
    return m;
  }

  /** 创建一个空 Mat 并登记 */
  create(): CvMat {
    const m = new cvInstance!.Mat();
    this.mats.push(m);
    return m;
  }

  releaseAll(): void {
    for (const m of this.mats) {
      try {
        m.delete();
      } catch {
        // 已释放过则忽略
      }
    }
    this.mats = [];
  }
}

// ---------------------------------------------------------------------------
// 自动巡边
// ---------------------------------------------------------------------------

/** 巡边结果 */
export interface OpenCvDetectResult {
  /** 轴对齐外接矩形（像素） */
  rect: Rect | null;
  /** 四个角点（左上、右上、右下、左下顺序），用于透视校正 */
  corners: Array<{ x: number; y: number }> | null;
  /** 是否检测到近似四边形（可做透视校正） */
  isQuad: boolean;
  /** 置信度 0~100 */
  confidence: number;
}

/**
 * 自动巡边：定位画面中的矩形文档。
 *
 * 流程（OpenCV 经典方案）：
 *   1. 灰度化
 *   2. 高斯模糊降噪
 *   3. 自适应二值化（均值法），让纸张与背景分离
 *   4. findContours 找全部轮廓
 *   5. approxPolyDP 多边形逼近，取面积最大的近似四边形
 *   6. 若四边形接近矩形则直接用；否则退化为其外接矩形
 *
 * 相比投影法，轮廓法能处理倾斜拍摄的文档（可进一步做透视校正）。
 */
export function detectRectWithOpenCV(imageData: ImageData): OpenCvDetectResult {
  const cv = cvInstance!;
  const pool = new MatPool();

  try {
    const src = pool.track(cv.matFromImageData(imageData));

    // 1. 灰度
    const gray = pool.create();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // 2. 高斯模糊降噪（ksize 取奇数）
    const blurred = pool.create();
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);

    // 3. 自适应二值化：局部均值法，对光照不均更鲁棒
    const binary = pool.create();
    cv.adaptiveThreshold(
      blurred,
      binary,
      255,
      cv.ADAPTIVE_THRESH_MEAN_C,
      cv.THRESH_BINARY,
      15,
      -2
    );

    // 4. 轮廓提取
    const contours = new cv.MatVector();
    const hierarchy = pool.create();
    cv.findContours(
      binary,
      contours,
      hierarchy,
      cv.RETR_LIST,
      cv.CHAIN_APPROX_SIMPLE
    );

    const total = contours.size();
    const imageArea = imageData.width * imageData.height;

    let bestArea = 0;
    let bestQuad: number[] | null = null;
    let bestRect: Rect | null = null;
    let secondBestArea = 0;

    for (let i = 0; i < total; i++) {
      const contour = contours.get(i);
      const area = cv.contourArea(contour);
      // 过小的轮廓是噪点，直接跳过（取画面面积的 2% 作为下限）
      if (area < imageArea * 0.02) {
        contour.delete();
        continue;
      }

      const peri = cv.arcLength(contour, true);
      const approx = pool.create();
      cv.approxPolyDP(contour, approx, 0.02 * peri, true);

      if (area > bestArea) {
        secondBestArea = bestArea;
        bestArea = area;

        if (approx.rows === 4) {
          // 近似四边形 -> 记录角点
          bestQuad = Array.from(approx.data32S);
          bestRect = null;
        } else {
          // 非四边形 -> 用外接矩形
          const bb = cv.boundingRect(contour);
          bestQuad = null;
          bestRect = {
            x: bb.x,
            y: bb.y,
            width: bb.width,
            height: bb.height
          };
        }
      } else if (area > secondBestArea) {
        secondBestArea = area;
      }

      contour.delete();
    }

    contours.delete();

    if (!bestArea || bestArea <= 0) {
      return { rect: null, corners: null, isQuad: false, confidence: 0 };
    }

    // 5. 计算外接矩形与角点
    const W = imageData.width;
    const H = imageData.height;

    if (bestQuad && bestQuad.length >= 8) {
      // 四角点顺序：findContours 不保证顺序，需要自己排成 左上/右上/右下/左下
      const pts: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < bestQuad.length; i += 2) {
        pts.push({ x: bestQuad[i]!, y: bestQuad[i + 1]! });
      }
      const ordered = orderCorners(pts);
      const xs = ordered.map(p => p.x);
      const ys = ordered.map(p => p.y);
      const rect: Rect = {
        x: Math.max(0, Math.min(...xs)),
        y: Math.max(0, Math.min(...ys)),
        width: Math.max(...xs) - Math.min(...xs),
        height: Math.max(...ys) - Math.min(...ys)
      };

      // 倾斜度：外接矩形面积 / 四边形实际面积。
      // 越接近 1 说明越"正"，越接近 0 说明是斜着拍的。
      let quadArea = 0;
      for (let i = 0; i < 4; i++) {
        const a = ordered[i]!;
        const b = ordered[(i + 1) % 4]!;
        quadArea += a.x * b.y - b.x * a.y;
      }
      quadArea = Math.abs(quadArea / 2);
      const skewRatio =
        quadArea > 0 ? (rect.width * rect.height) / quadArea : 1;

      return {
        rect: clampRect(rect, W, H),
        corners: ordered,
        isQuad: true,
        confidence: scoreConfidence(bestArea, imageArea, skewRatio)
      };
    }

    if (bestRect) {
      const clamped = clampRect(bestRect, W, H);
      return {
        rect: clamped,
        corners: null,
        isQuad: false,
        confidence: scoreConfidence(bestArea, imageArea, 1)
      };
    }

    return { rect: null, corners: null, isQuad: false, confidence: 0 };
  } finally {
    pool.releaseAll();
  }
}

/** 把四个角点排成 左上 -> 右上 -> 右下 -> 左下 */
function orderCorners(
  pts: Array<{ x: number; y: number }>
): Array<{ x: number; y: number }> {
  // 按 x+y 排序：最小的是左上，最大的是右下
  const sorted = [...pts].sort((a, b) => a.x + a.y - (b.x + b.y));
  const leftTop = sorted[0]!;
  const rightBottom = sorted[sorted.length - 1]!;
  // 剩下两个：x 小的是左上，x 大的是右上
  const rest = sorted.slice(1, -1);
  rest.sort((a, b) => a.x - b.x);
  return [leftTop!, rest[0]!, rightBottom!, rest[1]!];
}

function clampRect(r: Rect, W: number, H: number): Rect {
  const x = Math.max(0, Math.min(r.x, W - 1));
  const y = Math.max(0, Math.min(r.y, H - 1));
  return {
    x,
    y,
    width: Math.max(1, Math.min(r.width, W - x)),
    height: Math.max(1, Math.min(r.height, H - y))
  };
}

/**
 * 置信度评分：
 *   - 面积占画面比例在 10%~90% 之间最理想
 *   - 正方形（skewRatio 接近 1）比倾斜的更可信
 */
function scoreConfidence(
  area: number,
  imageArea: number,
  skewRatio: number
): number {
  const ratio = area / imageArea;
  let score = 100;
  if (ratio < 0.05) score = 40;
  else if (ratio < 0.12) score = 65;
  else if (ratio > 0.97) score = 50;
  else if (ratio > 0.9) score = 75;

  // 倾斜惩罚：正对时 ratio≈1，斜 45° 时约 2
  const skewPenalty = Math.min(1, Math.max(0, (skewRatio - 1) / 1));
  score -= Math.round(skewPenalty * 25);
  return Math.max(0, Math.min(100, score));
}

// ---------------------------------------------------------------------------
// 透视校正（把倾斜的文档拉正）
// ---------------------------------------------------------------------------

/**
 * 透视校正：把四边形区域拉成正矩形。
 * corners 为 左上/右上/右下/左下 顺序。
 */
export function perspectiveCorrect(
  imageData: ImageData,
  corners: Array<{ x: number; y: number }>,
  outWidth?: number
): ImageData {
  const cv = cvInstance!;
  const pool = new MatPool();

  try {
    const src = pool.track(cv.matFromImageData(imageData));

    // corners 已由调用方保证长度为 4
    const lt = corners[0]!;
    const rt = corners[1]!;
    const rb = corners[2]!;
    const lb = corners[3]!;
    const topWidth = Math.hypot(rt.x - lt.x, rt.y - lt.y);
    const bottomWidth = Math.hypot(rb.x - lb.x, rb.y - lb.y);
    const leftHeight = Math.hypot(lb.x - lt.x, lb.y - lt.y);
    const rightHeight = Math.hypot(rb.x - rt.x, rb.y - rt.y);

    const outW = outWidth ?? Math.round(Math.max(topWidth, bottomWidth));
    const outH = Math.round(Math.max(leftHeight, rightHeight));
    if (outW < 8 || outH < 8) {
      return imageData;
    }

    // 源四边形 -> 目标矩形。
    // 注意：不能用 new cv.Mat()，那样得到的是空 Mat（长度为 0），
    // 往 data32S 里写会抛越界。必须用 matFromArray 分配实际尺寸。
    const srcQuad = pool.track(
      cv.matFromArray(4, 1, cv.CV_32FC2, [
        lt.x,
        lt.y,
        rt.x,
        rt.y,
        rb.x,
        rb.y,
        lb.x,
        lb.y
      ])
    );

    const dstQuad = pool.track(
      cv.matFromArray(4, 1, cv.CV_32FC2, [
        0,
        0,
        outW - 1,
        0,
        outW - 1,
        outH - 1,
        0,
        outH - 1
      ])
    );

    // 单应矩阵同样是 3x3 的浮点矩阵
    const M = pool.track(
      cv.matFromArray(3, 3, cv.CV_32FC1, new Array(9).fill(0))
    );
    cv.getPerspectiveTransform(srcQuad, dstQuad, M);

    const dst = pool.create();
    cv.warpPerspective(
      src,
      dst,
      M,
      new cv.Size(outW, outH),
      cv.INTER_LINEAR,
      cv.BORDER_CONSTANT,
      new cv.Scalar(0, 0, 0, 0)
    );

    return cloneImageData(cv, dst, outW, outH);
  } finally {
    pool.releaseAll();
  }
}

// ---------------------------------------------------------------------------
// 图像优化流水线
// ---------------------------------------------------------------------------

/** 优化参数（与自研版本保持一致的语义） */
export interface OpenCvOptimizeOptions {
  denoise: boolean;
  grayscale: boolean;
  equalize: boolean;
  brightness: number;
  contrast: number;
  blurRadius: number;
  sharpenAmount: number;
  thresholdBlock: number;
  thresholdC: number;
  emboss: boolean;
  invert: boolean;
  /** 巡边是否做透视校正（把倾斜文档拉正） */
  perspective: boolean;
}

/** 默认参数 */
export const OPENCV_DEFAULT_OPTIONS: OpenCvOptimizeOptions = {
  denoise: true,
  grayscale: false,
  equalize: true,
  brightness: 8,
  contrast: 18,
  blurRadius: 1,
  sharpenAmount: 35,
  thresholdBlock: 0,
  thresholdC: 10,
  emboss: false,
  invert: false,
  perspective: true
};

/**
 * 执行图像优化流水线。
 * 所有算子均由 OpenCV（编译为 wasm）执行，主线程与 Worker 都不做逐像素运算。
 */
export function runOpenCVPipeline(
  imageData: ImageData,
  opts: OpenCvOptimizeOptions
): { image: ImageData; timings: StepTiming[]; total: number } {
  const cv = cvInstance!;
  const timings: StepTiming[] = [];
  const t0 = performance.now();

  const step = <T>(name: string, fn: () => T): T => {
    const s = performance.now();
    const r = fn();
    timings.push({ name, ms: performance.now() - s });
    return r;
  };

  const pool = new MatPool();
  try {
    let cur = pool.track(cv.matFromImageData(imageData));
    let workingChannels = 4; // 4=RGBA, 1=GRAY, 3=RGB

    // 1. 中值滤波去噪：先降噪，避免后续锐化把噪点放大
    if (opts.denoise) {
      step('中值滤波', () => {
        const next = pool.create();
        cv.medianBlur(cur, next, 3);
        cur.delete();
        cur = next;
      });
    }

    // 2. 灰度化
    if (opts.grayscale) {
      step('灰度化', () => {
        const next = pool.create();
        cv.cvtColor(cur, next, cv.COLOR_RGBA2GRAY);
        cur.delete();
        cur = next;
        workingChannels = 1;
      });
    }

    // 3. 直方图均衡化（仅单通道可用）
    if (opts.equalize && workingChannels === 1) {
      step('直方图均衡', () => {
        const next = pool.create();
        cv.equalizeHist(cur, next);
        cur.delete();
        cur = next;
      });
    }

    // 4. 亮度 / 对比度：convertTo(alpha, beta) 即 v' = v*alpha + beta
    if (opts.brightness !== 0 || opts.contrast !== 0) {
      step('亮度对比度', () => {
        const next = pool.create();
        // contrast 映射为增益：+100 -> 2.0 倍；brightness 映射为偏移：+100 -> +127
        const alpha = 1 + opts.contrast / 100;
        const beta = (opts.brightness * 127) / 100;
        cur.convertTo(next, cur.type(), alpha, beta);
        cur.delete();
        cur = next;
      });
    }

    // 5. 高斯模糊
    if (opts.blurRadius > 0) {
      step('高斯模糊', () => {
        const next = pool.create();
        const k = opts.blurRadius * 2 + 1; // ksize 必须为正奇数
        cv.GaussianBlur(cur, next, new cv.Size(k, k), 0);
        cur.delete();
        cur = next;
      });
    }

    // 6. 锐化：filter2D + 拉普拉斯核（等价于 unsharp mask 的负核形式）
    if (opts.sharpenAmount > 0) {
      step('锐化', () => {
        const k = cv.matFromArray(
          3,
          3,
          cv.CV_32F,
          [0, -1, 0, -1, 5, -1, 0, -1, 0]
        );
        const next = pool.create();
        cv.filter2D(
          cur,
          next,
          -1,
          k,
          new cv.Point(-1, -1),
          0,
          cv.BORDER_CONSTANT
        );
        k.delete();
        cur.delete();
        cur = next;
      });
    }

    // 7. 自适应二值化：扫描件出黑白稿
    if (opts.thresholdBlock > 0) {
      step('自适应二值化', () => {
        const next = pool.create();
        // blockSize 必须是 >1 的奇数
        let block = Math.max(3, Math.round(opts.thresholdBlock));
        if (block % 2 === 0) block += 1;
        cv.adaptiveThreshold(
          cur,
          next,
          255,
          cv.ADAPTIVE_THRESH_MEAN_C,
          cv.THRESH_BINARY,
          block,
          opts.thresholdC
        );
        cur.delete();
        cur = next;
        workingChannels = 1;
      });
    }

    // 8. 浮雕
    if (opts.emboss) {
      step('浮雕', () => {
        const k = cv.matFromArray(
          3,
          3,
          cv.CV_32F,
          [-2, -1, 0, -1, 0, 1, 0, 1, 2]
        );
        const next = pool.create();
        cv.filter2D(
          cur,
          next,
          -1,
          k,
          new cv.Point(-1, -1),
          128,
          cv.BORDER_CONSTANT
        );
        k.delete();
        cur.delete();
        cur = next;
      });
    }

    // 9. 反色
    if (opts.invert) {
      step('反色', () => {
        const next = pool.create();
        // 255 - v：alpha=1, beta=-v 不可用（beta 是加法），
        // 这里用 LUT 的等价写法：bitwise_not
        cv.bitwise_not(cur, next);
        cur.delete();
        cur = next;
      });
    }

    const image = cloneImageData(cv, cur, cur.cols, cur.rows);
    return { image, timings, total: performance.now() - t0 };
  } finally {
    pool.releaseAll();
  }
}

// ---------------------------------------------------------------------------
// 结果输出
// ---------------------------------------------------------------------------

/**
 * 把 OpenCV 的 Mat 转成 ImageData。
 * 单通道需手动扩展成 RGBA（OpenCV 不会自动做这件事）。
 */
export function cloneImageData(
  cv: Cv,
  mat: CvMat,
  width?: number,
  height?: number
): ImageData {
  const w = width ?? mat.cols;
  const h = height ?? mat.rows;
  const out = new ImageData(w, h);
  const dst = out.data;

  if (mat.rows === h && mat.cols === w && mat.data.length === w * h * 4) {
    // 已是 RGBA，直接拷贝
    dst.set(mat.data.subarray(0, w * h * 4));
    return out;
  }

  const src = mat.data;
  if (mat.rows === h && mat.cols === w) {
    if (src.length === w * h) {
      // 单通道灰度 -> RGBA
      for (let i = 0, p = 0; i < w * h; i++, p += 4) {
        const g = src[i]!;
        dst[p] = g;
        dst[p + 1] = g;
        dst[p + 2] = g;
        dst[p + 3] = 255;
      }
      return out;
    }
    if (src.length === w * h * 3) {
      // RGB -> RGBA
      for (let i = 0, p = 0, s = 0; i < w * h; i++, p += 4, s += 3) {
        dst[p] = src[s]!;
        dst[p + 1] = src[s + 1]!;
        dst[p + 2] = src[s + 2]!;
        dst[p + 3] = 255;
      }
      return out;
    }
  }

  // 兜底：按 8 位单通道拉伸
  for (let i = 0, p = 0; i < w * h; i++, p += 4) {
    const g = src[i] ?? 0;
    dst[p] = g;
    dst[p + 1] = g;
    dst[p + 2] = g;
    dst[p + 3] = 255;
  }
  return out;
}

/** 边缘可视化：输出 Sobel 梯度图，便于调参 */
export function sobelPreview(imageData: ImageData): ImageData {
  const cv = cvInstance!;
  const pool = new MatPool();
  try {
    const src = pool.track(cv.matFromImageData(imageData));
    const gray = pool.create();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    const blurred = pool.create();
    cv.GaussianBlur(gray, blurred, new cv.Size(3, 3), 0);

    const gx = pool.create();
    const gy = pool.create();
    cv.Sobel(blurred, gx, cv.CV_32F, 1, 0, 3, 1, 0, cv.BORDER_CONSTANT);
    cv.Sobel(blurred, gy, cv.CV_32F, 0, 1, 3, 1, 0, cv.BORDER_CONSTANT);

    const mag = pool.create();
    cv.magnitude(gx, gy, mag);

    // 归一化到 0-255
    cv.normalize(mag, mag, 0, 255, cv.NORM_MINMAX, cv.CV_8UC1);

    const rgba = pool.create();
    cv.cvtColor(mag, rgba, cv.COLOR_GRAY2RGBA);

    return cloneImageData(cv, rgba);
  } finally {
    pool.releaseAll();
  }
}

/** 释放已加载的 OpenCV（不常用，主要用于测试） */
export function disposeOpenCV(): void {
  cvInstance = null;
  loadingPromise = null;
}

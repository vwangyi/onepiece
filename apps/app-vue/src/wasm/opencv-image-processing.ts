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
  /**
   * 创建形态学结构元。
   * 注意：OpenCV 5.0 的第二参要求 cv.Size 对象（传数字会报
   * "Cannot use 'in' operator to search for 'width'"）。
   */
  getStructuringElement(shape: number, ksize: unknown): CvMat;
  morphologyEx(
    src: CvMat,
    dst: CvMat,
    op: number,
    kernel: CvMat,
    anchor?: unknown,
    iterations?: number,
    borderType?: number,
    borderValue?: unknown
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
  MORPH_RECT: number;
  MORPH_CLOSE: number;
  THRESH_BINARY: number;
  THRESH_BINARY_INV: number;
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
 * 关键点：opencv.js 是一个 12.7MB 的 **UMD** 包，
 * 里面用 latin1 字符串内嵌了 11.4MB 的 wasm 二进制（Emscripten 的 SINGLE_FILE=1 产物），
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
  /** 检出矩形的宽高比，调试用 */
  aspectRatio: number;
  /** 卡片占画面面积的比例，调试用 */
  areaRatio: number;
}

/**
 * 巡边配置。默认值针对「拍摄身份证」场景调优。
 */
export interface DetectConfig {
  /**
   * 期望宽高比（宽 / 高）。
   * 二代身份证 85.6mm × 54mm ≈ 1.585，这是最强的先验：
   * 画面里往往还有其他矩形（证件照、卡片），用比例可以排除掉。
   * 设为 0 表示不启用比例先验。
   */
  expectedAspectRatio: number;
  /** 比例容差。0.25 表示 1.585 ± 25% 都算合理 */
  aspectTolerance: number;
  /** 轮廓面积下限（占画面比例），低于此值视为噪点 */
  minAreaRatio: number;
  /** 是否允许卡片贴边/出血（面积占比可以接近 1） */
  allowFillFrame: boolean;
}

/** 身份证场景的默认配置 */
export const ID_CARD_DETECT_CONFIG: DetectConfig = {
  expectedAspectRatio: 85.6 / 54, // ≈ 1.585
  aspectTolerance: 0.25,
  minAreaRatio: 0.02,
  allowFillFrame: true
};

/** 通用文档场景（不启用比例先验） */
export const GENERIC_DETECT_CONFIG: DetectConfig = {
  expectedAspectRatio: 0,
  aspectTolerance: 0.35,
  minAreaRatio: 0.02,
  allowFillFrame: false
};

/** 候选轮廓的评分结果 */
interface Candidate {
  quad: number[] | null;
  rect: Rect | null;
  area: number;
  score: number;
}

/**
 * 自动巡边：定位画面中的证件卡片。
 *
 * 针对「拍身份证」的优化点：
 *
 * 1. **多路候选**：不只取面积最大的轮廓，而是对每个轮廓打分后选最优。
 *    身份证场景下画面里常有多张卡（身份证+银行卡+证件照），
 *    单纯按面积会选错。
 *
 * 2. **比例先验**：二代身份证 85.6:54 ≈ 1.585，这个比例非常独特。
 *    把「宽高比接近 1.585」作为加分项，能有效排除干扰物。
 *
 * 3. **多档 approxPolyDP**：圆角会让逼近结果在 4~8 个顶点间跳变。
 *    遍历多个 eps 取第一个恰好 4 顶点的结果，比固定 eps 稳。
 *
 * 4. **评分而非硬阈值**：占满画面在证件拍摄中是正常情况，
 *    不再因为 areaRatio 过大而判为误检。
 *
 * 5. **边缘兜底**：当二值化因低对比度失败时，
 *    退到 Canny 边缘 + 膨胀再找轮廓。
 *
 * 基础流程：灰度 → 高斯降噪 → 自适应二值化 → findContours
 *          → approxPolyDP 取四边形 → 按「面积 × 比例 × 正对度」打分。
 */
export function detectRectWithOpenCV(
  imageData: ImageData,
  config: DetectConfig = ID_CARD_DETECT_CONFIG
): OpenCvDetectResult {
  const cv = cvInstance!;
  const pool = new MatPool();
  const empty: OpenCvDetectResult = {
    rect: null,
    corners: null,
    isQuad: false,
    confidence: 0,
    aspectRatio: 0,
    areaRatio: 0
  };

  try {
    const src = pool.track(cv.matFromImageData(imageData));
    const W = imageData.width;
    const H = imageData.height;
    const imageArea = W * H;

    const gray = pool.create();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    const blurred = pool.create();
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);

    // 两条检测路线：阈值分割（快，抗光照不均）+ 边缘（低对比度兜底）
    const routes: CvMat[] = [];

    // 路线 1：自适应二值化
    const byThreshold = pool.create();
    cv.adaptiveThreshold(
      blurred,
      byThreshold,
      255,
      cv.ADAPTIVE_THRESH_MEAN_C,
      cv.THRESH_BINARY,
      15,
      -2
    );
    routes.push(byThreshold);

    // 路线 2：Canny 边缘 + 闭运算，把断边连起来
    // 卡片与背景对比度低时（比如白卡放白桌），阈值分割会失效，这条路能救回来
    const edges = pool.create();
    cv.Canny(blurred, edges, 40, 120);
    // 注意：OpenCV 5.0 的 getStructuringElement 第二参是 cv.Size 对象
    const kernel = pool.track(
      cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3))
    );
    const closed = pool.create();
    cv.morphologyEx(edges, closed, cv.MORPH_CLOSE, kernel);
    routes.push(closed);

    // 路线 3：低阈值 Canny，专门捞弱边界。
    // 证件拍摄有时会碰到「白卡放在浅色桌面」这种低对比度情况，
    // 卡片外轮廓的梯度只有 30 左右，用路线 2 的阈值(40) 会整条丢失。
    // 这里把阈值降到 12，同时靠评分里的「面积 + 比例 + 正对度」过滤噪点。
    const weakEdges = pool.create();
    cv.Canny(blurred, weakEdges, 12, 40);
    const weakClosed = pool.create();
    cv.morphologyEx(weakEdges, weakClosed, cv.MORPH_CLOSE, kernel);
    routes.push(weakClosed);

    let best: Candidate | null = null;

    for (const route of routes) {
      const contours = new cv.MatVector();
      const hierarchy = pool.create();
      cv.findContours(
        route,
        contours,
        hierarchy,
        cv.RETR_LIST,
        cv.CHAIN_APPROX_SIMPLE
      );

      for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const area = cv.contourArea(contour);
        if (area < imageArea * config.minAreaRatio) {
          contour.delete();
          continue;
        }

        const peri = cv.arcLength(contour, true);
        if (peri <= 0) {
          contour.delete();
          continue;
        }

        // 多档 eps：圆角会让固定 eps 的逼近结果在 4~8 顶点间跳变
        for (const epsRatio of [0.02, 0.03, 0.04, 0.05, 0.08]) {
          const approx = pool.create();
          cv.approxPolyDP(contour, approx, epsRatio * peri, true);

          let quad: number[] | null = null;
          let rect: Rect | null = null;

          if (approx.rows === 4) {
            quad = Array.from(approx.data32S);
          } else if (approx.rows < 4) {
            // 逼近成三角形等，说明 epsilon 过大，跳过这一档
            approx.delete();
            continue;
          } else {
            // 顶点过多（圆角/毛边），退回外接矩形
            const bb = cv.boundingRect(contour);
            rect = { x: bb.x, y: bb.y, width: bb.width, height: bb.height };
          }
          approx.delete();

          const cand = quad
            ? scoreQuad(quad, area, imageArea, W, H, config)
            : scoreRect(rect!, area, imageArea, W, H, config);

          if (cand && (!best || cand.score > best.score)) {
            best = cand;
          }
          // 已经拿到 4 顶点，再换更大的 eps 只会更糙，没必要继续
          if (quad) break;
        }
        contour.delete();
      }
      contours.delete();
    }

    if (!best || best.area <= 0) return empty;

    // ---- 输出 ----
    if (best.quad) {
      const pts: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < best.quad.length; i += 2) {
        pts.push({ x: best.quad[i]!, y: best.quad[i + 1]! });
      }
      const ordered = orderCorners(pts);
      const xs = ordered.map(p => p.x);
      const ys = ordered.map(p => p.y);
      const rect: Rect = {
        x: Math.min(...xs),
        y: Math.min(...ys),
        width: Math.max(...xs) - Math.min(...xs),
        height: Math.max(...ys) - Math.min(...ys)
      };
      const skew = skewRatioOf(ordered);
      return {
        rect: clampRect(rect, W, H),
        corners: ordered,
        isQuad: true,
        confidence: best.score,
        aspectRatio: ratioOf(rect.width, rect.height),
        areaRatio: best.area / imageArea
      };
    }

    if (best.rect) {
      const clamped = clampRect(best.rect, W, H);
      return {
        rect: clamped,
        corners: null,
        isQuad: false,
        confidence: best.score,
        aspectRatio: ratioOf(clamped.width, clamped.height),
        areaRatio: best.area / imageArea
      };
    }

    return empty;
  } finally {
    pool.releaseAll();
  }
}

/** 计算宽高比，避免除零 */
function ratioOf(w: number, h: number): number {
  return h > 0 ? w / h : 0;
}

/**
 * 比例得分：越接近期望比例越高。
 * 关闭先验（expectedAspectRatio = 0）时返回中性分 1。
 */
function aspectScore(ratio: number, config: DetectConfig): number {
  if (config.expectedAspectRatio <= 0 || ratio <= 0) return 1;
  const expected = config.expectedAspectRatio;
  const rel = Math.abs(ratio - expected) / expected;
  if (rel > config.aspectTolerance) return 0;
  // 在容差范围内线性衰减：完全吻合 1.0，刚好到边缘 0.35
  return 1 - (rel / config.aspectTolerance) * 0.65;
}

/** 面积得分：证件场景下大而完整的卡片最可信 */
function areaScore(areaRatio: number, config: DetectConfig): number {
  if (areaRatio < 0.02 || areaRatio > 1.2) return 0;
  // 占画面 30%~92% 是最理想的取景
  if (areaRatio >= 0.3 && areaRatio <= 0.92) return 1;
  // 贴边（出血）时轻微扣分，但不失信 —— 证件拍摄很常见
  if (areaRatio > 0.92) return config.allowFillFrame ? 0.75 : 0.3;
  return 0.5;
}

/**
 * 给一个近似四边形打分。
 *
 * 权重设计的考量（针对身份证场景）：
 *   面积权重最高（0.5）。证件拍摄时目标就是"手里那一张"，
 *   它在画面中占比最大；银行卡、证件照等干扰物面积都明显更小。
 *   如果面积权重不够，画面里有多张卡时会选错 —— 实测把权重从 0.4 提到 0.5
 *   才能稳定压过同比例的小卡片。
 *   比例次之（0.3）：1.585 的身份证比例很独特，能排除掉名片、证件照等竖着的东西。
 *   正对度再次（0.2）：倾斜拍摄的惩罚。
 */
function scoreQuad(
  quad: number[],
  area: number,
  imageArea: number,
  W: number,
  H: number,
  config: DetectConfig
): Candidate | null {
  const pts: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < quad.length; i += 2) {
    pts.push({ x: quad[i]!, y: quad[i + 1]! });
  }
  const ordered = orderCorners(pts);
  const xs = ordered.map(p => p.x);
  const ys = ordered.map(p => p.y);
  const rect: Rect = {
    x: Math.min(...xs),
    y: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys)
  };
  if (rect.width < 4 || rect.height < 4) return null;

  const ar = aspectScore(ratioOf(rect.width, rect.height), config);
  const as = areaScore(area / imageArea, config);
  // 正对度：外接矩形面积 / 实际四边形面积，1 表示完全正对
  const skew = skewRatioOf(ordered);
  const skewScore = Math.max(0, Math.min(1, 2 - skew));

  const score = Math.round((as * 0.5 + ar * 0.3 + skewScore * 0.2) * 100);
  return { quad, rect: null, area, score };
}

/** 给一个外接矩形打分（非四边形退化情况） */
function scoreRect(
  rect: Rect,
  area: number,
  imageArea: number,
  W: number,
  H: number,
  config: DetectConfig
): Candidate | null {
  if (rect.width < 4 || rect.height < 4) return null;
  // 外接矩形完全在画面外也没意义
  if (rect.x >= W || rect.y >= H) return null;

  const ar = aspectScore(ratioOf(rect.width, rect.height), config);
  const as = areaScore(area / imageArea, config);
  // 非四边形说明形状不理想（可能是圆角没逼近好），给一个折扣
  const score = Math.round((as * 0.5 + ar * 0.3) * 100 * 0.85);
  return { quad: null, rect, area, score };
}

/**
 * 正对度：外接矩形面积 / 四边形面积。
 * = 1 表示正对；越大表示越倾斜。
 */
function skewRatioOf(ordered: Array<{ x: number; y: number }>): number {
  let quadArea = 0;
  for (let i = 0; i < 4; i++) {
    const a = ordered[i]!;
    const b = ordered[(i + 1) % 4]!;
    quadArea += a.x * b.y - b.x * a.y;
  }
  quadArea = Math.abs(quadArea / 2);
  if (quadArea <= 0) return 1;
  const xs = ordered.map(p => p.x);
  const ys = ordered.map(p => p.y);
  const bboxArea =
    (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
  return bboxArea / quadArea;
}

/**
 * 把四个角点排成 左上 -> 右上 -> 右下 -> 左下。
 *
 * 不能用「按 x+y 排序」：卡片倾斜后 x+y 最小的不再是左上角，
 * 透视校正用错角点会拉出旋转 90° 的结果（实测 10° 倾斜就会排错）。
 *
 * 采用两步法：
 *   1. 以质心为原点算极角并排序 —— 保证「相邻点一定是相邻的角」，不会交叉；
 *   2. 找到四边形中最长的那条边。身份证是长方形（85.6:54），
 *      最长边必定是「上边」或「下边」，其两端就是左上和右上的候选；
 *      再用中点相对质心的位置判断它是上边还是下边，最后按 x 排左右。
 *
 * 适用前提：卡片旋转不超过 ±90°。证件拍摄不会出现 90° 以上的情况
 * （那样用户自己就能看出来），此时「哪条边是上边」在几何上本质歧义。
 */
function orderCorners(
  pts: Array<{ x: number; y: number }>
): Array<{ x: number; y: number }> {
  if (pts.length !== 4) return pts;

  const cx = (pts[0]!.x + pts[1]!.x + pts[2]!.x + pts[3]!.x) / 4;
  const cy = (pts[0]!.y + pts[1]!.y + pts[2]!.y + pts[3]!.y) / 4;

  // 1. 环形排序
  const ring = pts
    .map(p => ({ x: p.x, y: p.y, angle: Math.atan2(p.y - cy, p.x - cx) }))
    .sort((a, b) => a.angle - b.angle);

  // 2. 找最长边
  let bestIdx = 0;
  let bestLen = 0;
  for (let i = 0; i < 4; i++) {
    const a = ring[i]!;
    const b = ring[(i + 1) % 4]!;
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len > bestLen) {
      bestLen = len;
      bestIdx = i;
    }
  }

  const a = ring[bestIdx]!;
  const b = ring[(bestIdx + 1) % 4]!;
  const c = ring[(bestIdx + 2) % 4]!;
  const d = ring[(bestIdx + 3) % 4]!;

  // 最长边中点相对质心更靠上 -> 它是上边
  const isTop = (a.y + b.y) / 2 < cy;
  let top: Array<{ x: number; y: number }>;
  let bottom: Array<{ x: number; y: number }>;
  if (isTop) {
    top = [a, b];
    bottom = [d, c];
  } else {
    bottom = [a, b];
    top = [d, c];
  }

  // 每条边按 x 排左右
  if (top[0]!.x > top[1]!.x) top = [top[1]!, top[0]!];
  if (bottom[0]!.x > bottom[1]!.x) bottom = [bottom[1]!, bottom[0]!];

  // 左上、右上、右下、左下
  return [top[0]!, top[1]!, bottom[1]!, bottom[0]!];
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

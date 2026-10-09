# 图像处理性能优化（OpenCV + WebAssembly）

对应《图像处理技术讲解》《图像处理面试讲解》两份文档的落地实现。

访问路径：`/image-process`（一级路由，挂在 `src/router/index.ts`）

## 技术栈

| 文档技术点              | 本项目实现                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| **WebAssembly**         | OpenCV 官方发布的 `opencv.js`（Emscripten 把 OpenCV C++ 编译成 wasm，base64 内嵌在单个 js 文件中） |
| **Web Worker**          | 所有 OpenCV 算子在独立线程执行，主线程只做采集与调度                                               |
| **OffscreenCanvas**     | `transferControlToOffscreen()` 交给 Worker，绘制即自动显示，像素数据不回传主线程                   |
| **requestIdleCallback** | 巡边与出图的大块数据投递都安排在浏览器空闲时                                                       |
| **Canvas**              | video 抓帧 → 检测框叠加 → 结果呈现                                                                 |

## 整体流程

```
摄像头 getUserMedia → <video> 预览
      │
      ├─ rAF 循环：降采样到 240px 宽
      │      └─ requestIdleCallback → postMessage(ArrayBuffer 转移)
      │
      └─ 点击「生成图片并优化」
             └─ 抓全分辨率帧 → requestIdleCallback → postMessage
                        │
              ┌─────────▼──────────────────┐
              │  Web Worker                  │
              │  ├ import opencv.js (UMD)    │
              │  ├ findContours 巡边         │
              │  ├ getPerspectiveTransform   │
              │  └ 优化流水线（多算子串联）   │
              └─────────┬──────────────────┘
                        │
              OffscreenCanvas 直接绘制（浏览器自动同步显示）
                        │
              主线程收到统计 → 页面展示各算子耗时
```

## 目录结构

```
wasm/
  opencv-test.mjs      OpenCV 功能测试（29 项）
src/
  wasm/opencv-image-processing.ts   OpenCV 封装：加载/巡边/透视校正/优化流水线
  workers/image-process.worker.ts   Worker（含 OffscreenCanvas 绘制）
  hooks/useImageScanner.ts          摄像头 / 巡边 / 出图编排
  views/ImageProcessView/           页面 UI
```

## 自动巡边原理（身份证场景）

**已针对「拍身份证」深度调优**，与通用文档巡边有几处关键差异。

### 三条检测路线

身份证拍摄的难点是「卡片几乎占满画面」「背景对比度不一定够」，单一阈值分割不够用，
所以并行跑三条路线，谁的评分高用谁：

| 路线 | 方法                             | 适用                        |
| ---- | -------------------------------- | --------------------------- |
| 1    | `adaptiveThreshold` 自适应二值化 | 常规情况，对光照不均鲁棒    |
| 2    | `Canny(40,120)` + 闭运算         | 卡片与背景对比度偏低        |
| 3    | `Canny(12,40)` + 闭运算          | 弱边界（浅色卡 + 浅色桌面） |

三条路线各自 `findContours` → `approxPolyDP`，所有候选统一打分，取最高分。

### 圆角处理

身份证是圆角卡片，`approxPolyDP` 的逼近结果会在 4~8 顶点之间跳变。
做法是**遍历多档 epsilon（0.02→0.08）**，取第一个恰好得到 4 顶点的结果，
比固定 epsilon 稳定得多。实测 16px 圆角仍能稳定得到 4 顶点。

### 比例先验（最强的判别依据）

二代身份证 **85.6mm × 54mm ≈ 1.585**，这个比例非常独特。
把它作为评分项能有效排除干扰物：

```
score = 面积分 × 0.5 + 比例分 × 0.3 + 正对度 × 0.2
```

- **面积权重最高（0.5）**：证件拍摄的目标就是手里那一张，画面占比最大。
  权重不够时，画面里有多张卡（身份证 + 银行卡 + 名片）会选错 —— 实测从 0.4 提到 0.5
  才能稳定压过同比例的小卡片。
- 比例分：接近 1.585 得满分，超出 ±25% 容差直接归零。

### 占满画面不再判为误检

通用文档场景下「面积占比 > 97%」通常意味着误检（框住了整幅画面）。
但拍身份证时卡片本来就该占满画面，所以配置里加了 `allowFillFrame`，
贴边时只轻微扣分（0.75）而不是判死。

### 角点排序：用最长边定位，不用 x+y

`findContours` 不保证角点顺序。早期实现按 `x+y` 排序，
**卡片一倾斜（实测 10°）就会排错**，导致透视校正用错角点、拉出旋转 90° 的结果。

现在的做法：

1. 以质心为原点算极角排序 —— 保证相邻点必相邻，不交叉
2. 找四边形**最长的那条边** —— 身份证是长方形，最长边必是上边或下边
3. 用中点相对质心的位置判断它是上边还是下边，再按 x 排左右

适用前提：卡片旋转不超过 ±90°（证件拍摄不会出现更大角度）。

### 实测精度

| 场景                      | 真值    | 检出    | 置信度 |
| ------------------------- | ------- | ------- | ------ |
| 深色桌面，占 33%          | 400×252 | 398×249 | 99     |
| **占满画面贴边（出血）**  | 632×398 | 629×396 | 100    |
| 浅色桌面低对比（30 灰阶） | 380×240 | 365×227 | 74     |
| 圆角 radius=16            | 380×240 | 375×235 | 74     |
| 倾斜 8°                   | 360×227 | 365×238 | 67     |
| 有干扰物（银行卡+名片）   | 400×252 | 397×249 | 99     |

### 已知物理极限

**对比度低于约 15 灰阶时，相机传感器本身就分不出边界**（信噪比不足）。
此时任何算法都只能检出卡片内部的高对比区域（如人像区），
无法还原卡片外轮廓 —— 这是物理限制，不是算法缺陷。
测试用例 3b 固化了该认知，确保此时**不会给出高置信度的错误结果**。

## OpenCV 5.0 的 API 差异（接入时踩的坑）

OpenCV 5.0 的 JS 绑定与 4.x 有几处不兼容，代码里已按 5.0 写法处理：

| API                   | 说明                                                                                |
| --------------------- | ----------------------------------------------------------------------------------- |
| `cv.convertTo`        | 5.0 中是 **Mat 实例方法** `mat.convertTo(dst, type, alpha, beta)`，不再是自由函数   |
| `cv.createMatKernel`  | 已移除，改用 `cv.matFromArray(rows, cols, type, data)`                              |
| `cv.rectangle` 等绘图 | 对对象参数校验很严（`Missing field: "x"`），避免传对象                              |
| `filter2D` 的 anchor  | 传 `undefined` 会报错，需显式给 `new cv.Point(-1, -1)`                              |
| `new cv.Mat()`        | 是**空 Mat**（长度为 0），往 `data32S` 写会越界，必须用 `matFromArray` 分配实际尺寸 |

## 加载方式（重要）

`opencv.js` 是 12.7MB 的 **UMD** 包，不能被 Vite 当 ESM 静态分析（会报 Rollup 语法错误）。
本项目的做法：

- 用 `?url` 让 Vite 原样产出资源文件，不做打包解析
- 主线程用 `<script>` 标签加载，Worker 用动态 `import()`
  （**module worker 不能用 `importScripts`**，浏览器会直接抛错）
- UMD 的 factory 返回 Promise，加载后还需 `await`

另外 Vite 必须配置 `worker.format: 'es'`，否则 worker 入口产生代码分割时
会报 `Invalid value "iife" for option "worker.format"`。

## 内存管理

OpenCV 的 `Mat` 由 wasm 堆分配，**必须显式 `delete()`**，否则多帧处理会持续泄漏显存。
代码里用 `MatPool` 在 `finally` 中统一释放：

```ts
const pool = new MatPool();
try {
  const src = pool.track(cv.matFromImageData(imageData));
  // ...
} finally {
  pool.releaseAll();
}
```

## 性能实测（1920×1080，本机 Node 基准）

优化流水线单步耗时见页面上的「各算法耗时」面板，典型值（320×240）：

| 算子       | 耗时  |
| ---------- | ----- |
| 中值滤波   | ~7 ms |
| 亮度对比度 | ~1 ms |
| 高斯模糊   | ~2 ms |
| 锐化       | ~3 ms |

巡边单帧 ~0.4ms，端到端延迟 ~31ms（含帧传输与 Blob 生成）。

> 注：Worker 线程带来的"主线程零阻塞"收益无法在 Node 基准里体现，
> 需要用 DevTools Performance 面板观察。

## 开发命令

```bash
# 启动开发服务器
pnpm dev:vue

# OpenCV 通用功能测试（29 项）
cd apps/app-vue && pnpm opencv:test

# 身份证巡边场景测试（25 项）
cd apps/app-vue && pnpm idcard:test
```

## 已知限制

- OpenCV.js 体积 12.7MB（wasm 内嵌），首次加载有明显等待。生产环境建议开启 gzip/br
  （实测 gzip 后约 3.5MB），并考虑做加载进度提示。
- `requestIdleCallback` 在 Safari 未实现，代码里做了能力检测并退化为 `setTimeout(0)`。
- 摄像头需要 HTTPS 或 localhost 环境。
- 巡边已针对身份证场景调优（比例先验 + 多路线 + 圆角处理），但对比度低于约 15 灰阶时
  受物理限制无法检出外轮廓。若检测失败，页面会提示"未识别到矩形"，
  可改用「居中裁剪出图」，或让用户把卡片放到深色背景上再拍。
- 检出结果的宽高比会显示在结果面板并按接近 1.585 的程度着色（绿/黄/红），
  便于现场判断是否检到了正确的卡片。

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

## 自动巡边原理

用 OpenCV 的经典方案，而非自研算法：

1. `cvtColor` 灰度化
2. `GaussianBlur` 降噪
3. `adaptiveThreshold` 自适应二值化（均值法），对光照不均更鲁棒
4. `findContours` 提取全部轮廓
5. `approxPolyDP` 多边形逼近，取面积最大的近似四边形
6. 置信度评分：面积占比 + 倾斜度惩罚

拿到四角后还能做 `getPerspectiveTransform` + `warpPerspective` **透视校正**，
把斜着拍的文档拉正 —— 这是自研投影法做不到的。

实测精度（320×240 画面，真实文档 160×160@(80,40)）：
检出 159×160@(80,39)，误差 ≤1px。

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

# 运行 OpenCV 功能测试（29 项）
cd apps/app-vue && pnpm opencv:test
```

## 已知限制

- OpenCV.js 体积 12.7MB（wasm 内嵌），首次加载有明显等待。生产环境建议开启 gzip/br
  （实测 gzip 后约 3.5MB），并考虑做加载进度提示。
- `requestIdleCallback` 在 Safari 未实现，代码里做了能力检测并退化为 `setTimeout(0)`。
- 摄像头需要 HTTPS 或 localhost 环境。
- 巡边针对"文档与背景有明显对比"这一典型扫描场景调优。若检测失败，
  页面会提示"未识别到矩形"，可改用「居中裁剪出图」。

/**
 * OpenCV 图像处理模块的功能测试
 *
 * 验证真实发布的 src/wasm/opencv-image-processing.ts：
 *   巡边（findContours + approxPolyDP）-> 透视校正 -> 优化流水线 -> 边缘预览
 *
 * 运行：node wasm/opencv-test.mjs
 */
import path from 'node:path';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Node 没有 ImageData / OffscreenCanvas，补最小 polyfill
class ImageDataPolyfill {
  constructor(a, b, c) {
    if (typeof a === 'number') {
      this.width = a;
      this.height = b;
      this.data = new Uint8ClampedArray(a * b * 4);
    } else {
      this.data = a;
      this.width = b;
      this.height = c;
    }
  }
}
globalThis.ImageData = ImageDataPolyfill;

// 用 esbuild 转译真实的 TS 源码，确保测的是发布代码
const entry = path.join(__dirname, '../src/wasm/opencv-image-processing.ts');
// 输出到项目内，确保 external 的 opencv-js 能从 node_modules 解析
const outFile = path.join(__dirname, '.opencv-glue.test.mjs');
const esbuildBin = [
  path.join(__dirname, '../../node_modules/.bin/esbuild'),
  path.join(__dirname, '../../../node_modules/.bin/esbuild')
].find(p => fs.existsSync(p));
if (!esbuildBin) {
  console.error('未找到 esbuild');
  process.exit(1);
}
execFileSync(
  esbuildBin,
  [
    entry,
    '--bundle',
    '--format=esm',
    '--platform=node',
    '--target=es2022',
    // OpenCV 保持外部引用，运行时从 node_modules 加载真实模块
    '--external:@techstark/opencv-js',
    `--outfile=${outFile}`
  ],
  { stdio: 'inherit' }
);

const mod = await import(outFile);

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.log(`  ✗ ${name} ${extra}`);
  }
}

// ---------------------------------------------------------------------------
console.log('[1] 加载 OpenCV');
const t0 = performance.now();
const cv = await mod.loadOpenCV();
const loadMs = performance.now() - t0;
console.log(`  加载耗时 ${loadMs.toFixed(0)}ms，版本 ${mod.opencvVersion()}`);
check('OpenCV 加载成功', mod.opencvLoaded());
check('Mat 构造函数可用', typeof cv.Mat === 'function');
check('版本号可读', /\d+\.\d+/.test(mod.opencvVersion()), mod.opencvVersion());

// ---------------------------------------------------------------------------
/** 造一张测试图：深色背景 + 指定矩形/四边形的浅色文档 */
function makeFrame(W, H, draw) {
  const img = new ImageDataPolyfill(W, H);
  const d = img.data;
  let seed = 12345;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  // 背景：深灰 + 轻微噪点
  for (let i = 0; i < W * H; i++) {
    const g = 38 + Math.round((rnd() - 0.5) * 8);
    d[i * 4] = g;
    d[i * 4 + 1] = g;
    d[i * 4 + 2] = g;
    d[i * 4 + 3] = 255;
  }
  draw(d, rnd);
  return img;
}

function fillRect(d, W, x0, y0, x1, y1, g) {
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const o = (y * W + x) * 4;
      d[o] = g;
      d[o + 1] = g;
      d[o + 2] = g;
    }
  }
}

// ---------------------------------------------------------------------------
console.log('\n[2] 自动巡边：正放的矩形文档');
{
  const W = 320,
    H = 240;
  const img = makeFrame(W, H, d => {
    fillRect(d, W, 80, 40, 240, 200, 230);
    // 文档内画几行文字
    for (let k = 0; k < 6; k++)
      fillRect(d, W, 100, 70 + k * 20, 220, 78 + k * 20, 45);
  });

  const r = mod.detectRectWithOpenCV(img);
  console.log(
    `  rect=${JSON.stringify(r.rect)} isQuad=${r.isQuad} conf=${r.confidence}`
  );
  if (r.corners) {
    console.log(`  corners=${JSON.stringify(r.corners)}`);
  }
  check('检测到矩形', r.rect !== null);
  if (r.rect) {
    check(
      '宽度接近 160',
      Math.abs(r.rect.width - 160) < 20,
      `got ${r.rect.width}`
    );
    check(
      '高度接近 160',
      Math.abs(r.rect.height - 160) < 20,
      `got ${r.rect.height}`
    );
    check(
      '左上角接近 (80,40)',
      Math.abs(r.rect.x - 80) < 20 && Math.abs(r.rect.y - 40) < 20,
      `got ${r.rect.x},${r.rect.y}`
    );
  }
  check('置信度 > 0', r.confidence > 0, `got ${r.confidence}`);
  check('识别为四边形', r.isQuad === true);
}

// ---------------------------------------------------------------------------
console.log('\n[3] 自动巡边：倾斜的文档（应识别为四边形）');
{
  const W = 320,
    H = 240;
  // 标准射线法判定点是否在多边形内（注意是 odd-even 规则，不是叉积同号）
  function inPoly(x, y, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i];
      const [xj, yj] = pts[j];
      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // 明显倾斜的四边形
  const pts = [
    [70, 50],
    [250, 80],
    [230, 190],
    [90, 170]
  ];

  const img = makeFrame(W, H, d => {
    for (let y = 40; y < 200; y++) {
      for (let x = 60; x < 270; x++) {
        if (inPoly(x, y, pts)) {
          const o = (y * W + x) * 4;
          d[o] = 230;
          d[o + 1] = 230;
          d[o + 2] = 230;
        }
      }
    }
  });

  const r = mod.detectRectWithOpenCV(img);
  console.log(
    `  rect=${JSON.stringify(r.rect)} isQuad=${r.isQuad} conf=${r.confidence}`
  );
  if (r.corners) console.log(`  corners=${JSON.stringify(r.corners)}`);
  check('检测到倾斜四边形', r.isQuad === true);
  check('返回了 4 个角点', r.corners !== null && r.corners.length === 4);
  if (r.corners) {
    const xs = r.corners.map(p => p.x);
    const ys = r.corners.map(p => p.y);
    check(
      '角点范围接近真实位置',
      Math.min(...xs) > 50 &&
        Math.max(...xs) < 270 &&
        Math.min(...ys) > 30 &&
        Math.max(...ys) < 210,
      `x:${Math.min(...xs)}~${Math.max(...xs)} y:${Math.min(...ys)}~${Math.max(...ys)}`
    );
    const corrected = mod.perspectiveCorrect(img, r.corners);
    check(
      '透视校正输出尺寸合理',
      corrected.width > 100 && corrected.height > 100,
      `${corrected.width}x${corrected.height}`
    );
  }
}

// ---------------------------------------------------------------------------
console.log('\n[4] 自动巡边：负样本（纯色图）');
{
  const W = 160,
    H = 120;
  const img = makeFrame(W, H, d => {
    for (let i = 0; i < W * H; i++) {
      d[i * 4] = 128;
      d[i * 4 + 1] = 128;
      d[i * 4 + 2] = 128;
    }
  });
  const r = mod.detectRectWithOpenCV(img);
  console.log(`  rect=${JSON.stringify(r.rect)} conf=${r.confidence}`);
  check(
    '纯色图不误检',
    r.rect === null || r.confidence <= 55,
    `got ${JSON.stringify(r.rect)}`
  );
}

// ---------------------------------------------------------------------------
console.log('\n[5] 优化流水线（默认参数）');
{
  const W = 320,
    H = 240;
  const img = makeFrame(W, H, d => {
    fillRect(d, W, 80, 40, 240, 200, 220);
    for (let k = 0; k < 6; k++)
      fillRect(d, W, 100, 70 + k * 20, 220, 78 + k * 20, 40);
  });

  const r = mod.runOpenCVPipeline(img, { ...mod.OPENCV_DEFAULT_OPTIONS });
  console.log('  步骤耗时：');
  for (const t of r.timings)
    console.log(`    ${t.name.padEnd(14)} ${t.ms.toFixed(2)} ms`);
  console.log(`  总耗时 ${r.total.toFixed(2)} ms`);
  check(
    '输出尺寸不变',
    r.image.width === W && r.image.height === H,
    `${r.image.width}x${r.image.height}`
  );
  check('产出了多个步骤', r.timings.length >= 4, `got ${r.timings.length}`);
  check('总耗时为正', r.total > 0);

  // 优化后文档区域应变亮
  const mid = (120 * W + 160) * 4;
  check('文档区域被提亮', r.image.data[mid] > 180, `got ${r.image.data[mid]}`);
}

// ---------------------------------------------------------------------------
console.log('\n[6] 各预设参数可跑通');
{
  const W = 200,
    H = 160;
  const base = makeFrame(W, H, d => {
    fillRect(d, W, 50, 30, 150, 130, 220);
    for (let k = 0; k < 4; k++)
      fillRect(d, W, 60, 50 + k * 20, 140, 56 + k * 20, 40);
  });

  const presets = [
    ['灰度', { grayscale: true }],
    [
      '浮雕',
      { emboss: true, blurRadius: 2, sharpenAmount: 0, equalize: false }
    ],
    ['二值化', { grayscale: true, thresholdBlock: 12 }],
    ['反色', { invert: true }],
    ['强锐化', { sharpenAmount: 90, blurRadius: 2 }],
    [
      '全关',
      {
        denoise: false,
        grayscale: false,
        equalize: false,
        brightness: 0,
        contrast: 0,
        blurRadius: 0,
        sharpenAmount: 0
      }
    ]
  ];

  for (const [name, patch] of presets) {
    try {
      const r = mod.runOpenCVPipeline(base, {
        ...mod.OPENCV_DEFAULT_OPTIONS,
        ...patch
      });
      check(
        `预设「${name}」执行成功`,
        r.image.data.length === W * H * 4 && r.total >= 0,
        `${r.total.toFixed(2)}ms`
      );
    } catch (e) {
      check(`预设「${name}」执行成功`, false, e.message);
    }
  }
}

// ---------------------------------------------------------------------------
console.log('\n[7] 边缘可视化预览');
{
  const W = 200,
    H = 160;
  const img = makeFrame(W, H, d => {
    fillRect(d, W, 50, 30, 150, 130, 230);
  });
  try {
    const edge = mod.sobelPreview(img);
    check(
      '边缘图尺寸正确',
      edge.width === W && edge.height === H,
      `${edge.width}x${edge.height}`
    );
    check('边缘图为 RGBA', edge.data.length === W * H * 4);
  } catch (e) {
    check('边缘图生成', false, e.message);
  }
}

// ---------------------------------------------------------------------------
console.log('\n[8] 多尺度巡边');
{
  const cases = [
    ['小文档', 240, 180, 60, 180, 30, 150],
    ['中文档', 320, 240, 60, 260, 40, 200],
    ['大文档', 400, 300, 40, 360, 30, 270]
  ];
  for (const [label, W, H, x0, x1, y0, y1] of cases) {
    const img = makeFrame(W, H, d => fillRect(d, W, x0, y0, x1, y1, 230));
    const r = mod.detectRectWithOpenCV(img);
    const gw = x1 - x0;
    const gh = y1 - y0;
    const ok =
      r.rect !== null &&
      Math.abs(r.rect.width - gw) < gw * 0.2 &&
      Math.abs(r.rect.height - gh) < gh * 0.2;
    check(
      `${label}（${gw}x${gh}）检出正确`,
      ok,
      r.rect ? `检出 ${r.rect.width}x${r.rect.height}` : '未检出'
    );
  }
}

console.log(`\n=== 结果: ${pass} 通过, ${fail} 失败 ===`);
process.exit(fail > 0 ? 1 : 0);

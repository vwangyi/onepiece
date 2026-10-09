<script setup lang="ts">
/**
 * ImageProcessView.vue —— 一级页面：摄像头扫描 + 图像优化
 *
 * 落地的技术方案（与《图像处理技术讲解》文档一一对应）：
 *
 *   WebAssembly   算法编译为 .wasm（wasm/assembly/index.ts，AssemblyScript 源码），
 *                 在 Worker 内动态加载执行，性能接近原生
 *   Web Worker    所有像素运算都在独立线程完成，主线程不阻塞、交互不掉帧
 *   Canvas        video 采集帧 -> canvas 抓帧 -> 裁剪出图
 *   OffscreenCanvas
 *                 结果画布 transferControlToOffscreen() 后交给 Worker，
 *                 Worker 直接绘制即自动显示，像素数据无需回传主线程
 *   requestIdleCallback
 *                 巡边与出图的大块数据投递都安排在浏览器空闲时，
 *                 保证滚动/点击等用户交互优先得到响应
 */
import { computed, reactive } from 'vue';
import { useImageScanner } from '@/hooks/useImageScanner';
import type { OpenCvOptimizeOptions } from '@/wasm/opencv-image-processing';
import { OPENCV_DEFAULT_OPTIONS } from '@/wasm/opencv-image-processing';

const {
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
  aspectRatio,
  areaRatio,
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
} = useImageScanner();

// 优化参数：复制一份，避免污染模块级常量
const options = reactive<OpenCvOptimizeOptions>({ ...OPENCV_DEFAULT_OPTIONS });

/** 巡边检测所用的降采样宽度，需与 useImageScanner 中的 DETECT_WIDTH 保持一致 */
const DETECT_WIDTH = 240;

/**
 * 巡边框在预览画面上的位置。
 * 优先用 OpenCV findContours 返回的四个角点画多边形（能贴合倾斜文档），
 * 没有角点时退化为外接矩形。
 */
const overlayStyle = computed(() => {
  // videoWidth/videoHeight 是非响应式 DOM 属性，
  // 依赖 videoSizeVersion 才能在尺寸就绪后重新计算
  void videoSizeVersion.value;
  const video = videoRef.value;
  const vw = video?.videoWidth || 0;
  const vh = video?.videoHeight || 0;
  if (!vw || !vh) return { display: 'none' };

  // 巡边在 DETECT_WIDTH 宽的降采样图上做，先换算回原图坐标再转百分比
  const scale = vw / DETECT_WIDTH;
  const toPct = (x: number, y: number) => ({
    x: ((x * scale) / vw) * 100,
    y: ((y * scale) / vh) * 100
  });

  // 优先画四边形轮廓
  if (isQuad.value && corners.value && corners.value.length === 4) {
    const pts = corners.value.map(c => toPct(c.x, c.y));
    return {
      display: 'block',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      clipPath: `polygon(${pts
        .map(p => `${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`)
        .join(', ')})`
    };
  }

  const r = rect.value;
  if (!r) return { display: 'none' };
  const left = ((r.x * scale) / vw) * 100;
  const top = ((r.y * scale) / vh) * 100;
  return {
    left: `${left.toFixed(2)}%`,
    top: `${top.toFixed(2)}%`,
    width: `${(((r.width * scale) / vw) * 100).toFixed(2)}%`,
    height: `${(((r.height * scale) / vh) * 100).toFixed(2)}%`
  };
});

/** 巡边状态的展示文案 */
const detectText = computed(() => {
  switch (detectStatus.value) {
    case 'found': {
      const shape = isQuad.value ? '四边形' : '矩形区域';
      const ratio =
        aspectRatio.value > 0 ? `，宽高比 ${aspectRatio.value.toFixed(2)}` : '';
      return `已识别${shape}（置信度 ${confidence.value}%${ratio}）${
        isQuad.value ? '，出图时自动透视校正' : ''
      }`;
    }
    case 'lost':
      return '未识别到矩形，请将文档放入取景框';
    case 'detecting':
      return '正在识别...';
    default:
      return cameraOn.value ? '等待画面...' : '摄像头未开启';
  }
});

/** 流水线总耗时与最慢一步 */
const slowestStep = computed(() => {
  const list = stats.value.timings;
  if (!list.length) return null;
  return list.reduce((a, b) => (a.ms >= b.ms ? a : b));
});

/**
 * 宽高比是否贴近身份证标准（85.6:54 ≈ 1.585）。
 * 偏差大说明可能检到了别的卡片（银行卡比例接近，但名片/证件照会差很多），
 * 用颜色提示，方便现场判断是否需要重新取景。
 */
const ratioClass = computed(() => {
  if (aspectRatio.value <= 0) return '';
  const dev = Math.abs(aspectRatio.value - 85.6 / 54) / (85.6 / 54);
  if (dev < 0.12) return 'ratio-good';
  if (dev < 0.3) return 'ratio-fair';
  return 'ratio-bad';
});

/** 一组预设，方便快速对比不同参数下的效果 */
const presets: Array<{
  key: string;
  label: string;
  patch: Partial<OpenCvOptimizeOptions>;
}> = [
  {
    key: 'doc',
    label: '文档扫描',
    patch: {
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
    }
  },
  {
    key: 'bw',
    label: '黑白扫描件',
    patch: {
      denoise: true,
      grayscale: true,
      equalize: true,
      brightness: 0,
      contrast: 25,
      blurRadius: 1,
      sharpenAmount: 20,
      thresholdBlock: 12,
      thresholdC: 10,
      emboss: false,
      invert: false,
      perspective: true
    }
  },
  {
    key: 'clarity',
    label: '增强清晰度',
    patch: {
      denoise: true,
      grayscale: false,
      equalize: true,
      brightness: 5,
      contrast: 30,
      blurRadius: 2,
      sharpenAmount: 70,
      thresholdBlock: 0,
      thresholdC: 10,
      emboss: false,
      invert: false,
      perspective: true
    }
  },
  {
    key: 'emboss',
    label: '浮雕效果',
    patch: {
      denoise: false,
      grayscale: true,
      equalize: false,
      brightness: 0,
      contrast: 30,
      blurRadius: 2,
      sharpenAmount: 0,
      thresholdBlock: 0,
      thresholdC: 10,
      emboss: true,
      invert: false,
      perspective: true
    }
  }
];

function applyPreset(patch: Partial<OpenCvOptimizeOptions>): void {
  Object.assign(options, patch);
}

function handleCapture(): void {
  capture(options, true);
}

/** 巡边没识别到时，用居中区域兜底出图 */
function handleCaptureCenter(): void {
  capture(options, false);
}

const hasResult = computed(() => !!resultUrl.value);
</script>

<template>
  <div class="scanner-page">
    <header class="page-header">
      <div>
        <h1>图像处理性能优化</h1>
        <p class="subtitle">
          摄像头自动巡边出图 · OpenCV + WebAssembly + Web Worker +
          OffscreenCanvas + requestIdleCallback
        </p>
      </div>
      <div class="tech-tags">
        <a-tag color="geekblue"
          >OpenCV {{ stats.opencvVersion || '加载中' }}</a-tag
        >
        <a-tag color="blue">WebAssembly</a-tag>
        <a-tag color="blue">Web Worker</a-tag>
        <a-tag color="blue">OffscreenCanvas</a-tag>
        <a-tag color="blue">requestIdleCallback</a-tag>
        <a-tag
          v-if="!supportsOffscreen"
          color="orange"
        >
          当前环境不支持 OffscreenCanvas
        </a-tag>
      </div>
    </header>

    <a-alert
      v-if="error"
      type="error"
      show-icon
      :message="error"
      class="error-alert"
    />

    <div class="content">
      <!-- 左侧：采集与巡边 -->
      <section class="panel">
        <div class="panel-title">
          <span>1. 摄像头取景与自动巡边</span>
          <a-tag :color="detectStatus === 'found' ? 'green' : 'default'">
            {{ detectText }}
          </a-tag>
        </div>

        <div class="preview-wrap">
          <video
            ref="videoRef"
            class="preview"
            playsinline
            muted
          />

          <!--
            自动巡边得到的红色框。
            检测到四边形时用 clip-path 画出贴合倾斜文档的多边形轮廓，
            否则退化为外接矩形。
          -->
          <div
            class="detect-box"
            :class="{ quad: isQuad }"
            :style="overlayStyle"
          >
            <template v-if="!isQuad">
              <span class="corner tl" />
              <span class="corner tr" />
              <span class="corner bl" />
              <span class="corner br" />
            </template>
            <span class="box-label">
              {{ rect ? `${rect.width}×${rect.height}` : '' }}
            </span>
          </div>

          <div
            v-if="!cameraOn"
            class="preview-placeholder"
          >
            <a-button
              type="primary"
              size="large"
              :loading="cameraStarting"
              @click="startCamera"
            >
              开启摄像头
            </a-button>
            <p class="hint">
              摄像头需要 HTTPS 或 localhost 环境；请将文档或矩形物体放入取景框
            </p>
          </div>
        </div>

        <div class="actions">
          <a-button
            v-if="!cameraOn"
            type="primary"
            @click="startCamera"
          >
            开启摄像头
          </a-button>
          <a-button
            v-else
            @click="stopCamera"
            >关闭摄像头</a-button
          >

          <a-button
            type="primary"
            :disabled="!cameraOn"
            :loading="processing"
            @click="handleCapture"
          >
            生成图片并优化
          </a-button>

          <a-button
            :disabled="!cameraOn"
            @click="handleCaptureCenter"
          >
            居中裁剪出图
          </a-button>

          <a-button
            :disabled="!cameraOn"
            @click="toggleEdgePreview"
          >
            {{ showEdgePreview ? '关闭边缘预览' : '边缘预览' }}
          </a-button>

          <a-button
            :disabled="!hasResult"
            @click="download"
            >下载图片</a-button
          >
          <a-button
            :disabled="!hasResult"
            @click="reset"
            >重置</a-button
          >
        </div>

        <a-alert
          v-if="!ready && cameraOn"
          type="info"
          show-icon
          message="正在加载 WebAssembly 模块..."
          class="mt"
        />
      </section>

      <!-- 右侧：结果与参数 -->
      <section class="panel">
        <div class="panel-title">
          <span>2. 优化结果</span>
          <a-tag
            v-if="stats.outputWidth"
            color="green"
          >
            {{ stats.outputWidth }}×{{ stats.outputHeight }}
          </a-tag>
        </div>

        <div class="result-wrap">
          <!--
            这个 canvas 的控制权在初始化时就 transferControlToOffscreen() 交给了 Worker，
            Worker 里 putImageData 后浏览器会自动把结果显示到这里，主线程不参与。
          -->
          <canvas
            ref="resultCanvasRef"
            class="result-canvas"
          />
          <div
            v-if="!hasResult"
            class="result-placeholder"
          >
            处理结果将在这里显示
          </div>
        </div>

        <a-descriptions
          v-if="hasResult"
          :column="2"
          size="small"
          bordered
          class="mt"
        >
          <a-descriptions-item label="巡边单帧">
            {{ stats.detectMs.toFixed(1) }} ms
          </a-descriptions-item>
          <a-descriptions-item label="检出宽高比">
            <span :class="ratioClass">
              {{ aspectRatio > 0 ? aspectRatio.toFixed(3) : '-' }}
            </span>
            <span
              v-if="aspectRatio > 0"
              class="muted"
              >（身份证 1.585）</span
            >
          </a-descriptions-item>
          <a-descriptions-item label="卡片占画面">
            {{ (areaRatio * 100).toFixed(0) }}%
          </a-descriptions-item>
          <a-descriptions-item label="端到端延迟">
            {{ stats.roundTripMs.toFixed(1) }} ms
          </a-descriptions-item>
          <a-descriptions-item label="流水线总耗时">
            {{ stats.processMs.toFixed(1) }} ms
          </a-descriptions-item>
          <a-descriptions-item label="像素数据量">
            {{
              (
                (stats.outputWidth * stats.outputHeight * 4) /
                1024 /
                1024
              ).toFixed(2)
            }}
            MB
          </a-descriptions-item>
        </a-descriptions>

        <!-- 各步骤耗时：直观体现 wasm 把重活挪出主线程后的收益 -->
        <div
          v-if="stats.timings.length"
          class="timings"
        >
          <div class="timings-title">
            各算法耗时（WebAssembly）
            <span
              v-if="slowestStep"
              class="muted"
            >
              最慢：{{ slowestStep.name }} {{ slowestStep.ms.toFixed(1) }}ms
            </span>
          </div>
          <div
            v-for="step in stats.timings"
            :key="step.name"
            class="timing-row"
          >
            <span class="timing-name">{{ step.name }}</span>
            <span class="timing-bar">
              <span
                class="timing-bar-inner"
                :style="{
                  width: `${Math.min(100, (step.ms / (slowestStep?.ms || 1)) * 100)}%`
                }"
              />
            </span>
            <span class="timing-ms">{{ step.ms.toFixed(1) }} ms</span>
          </div>
        </div>
      </section>
    </div>

    <!-- 参数面板 -->
    <section class="panel">
      <div class="panel-title">
        <span>3. 图像优化参数</span>
        <div class="presets">
          <a-button
            v-for="p in presets"
            :key="p.key"
            size="small"
            @click="applyPreset(p.patch)"
          >
            {{ p.label }}
          </a-button>
        </div>
      </div>

      <div class="options-grid">
        <div class="opt">
          <a-switch v-model:checked="options.denoise" />
          <span>中值滤波去噪</span>
        </div>
        <div class="opt">
          <a-switch v-model:checked="options.grayscale" />
          <span>灰度化</span>
        </div>
        <div class="opt">
          <a-switch v-model:checked="options.equalize" />
          <span>直方图均衡</span>
        </div>
        <div class="opt">
          <a-switch v-model:checked="options.emboss" />
          <span>浮雕</span>
        </div>
        <div class="opt">
          <a-switch v-model:checked="options.invert" />
          <span>反色</span>
        </div>
        <div class="opt">
          <a-switch
            v-model:checked="options.perspective"
            :disabled="!isQuad"
          />
          <span>
            透视校正
            <a-tooltip
              v-if="!isQuad"
              title="需要先检测到四边形轮廓"
            >
              <span class="hint-icon">?</span>
            </a-tooltip>
          </span>
        </div>

        <div class="opt slider">
          <span class="opt-label">亮度 {{ options.brightness }}</span>
          <a-slider
            v-model:value="options.brightness"
            :min="-100"
            :max="100"
          />
        </div>
        <div class="opt slider">
          <span class="opt-label">对比度 {{ options.contrast }}</span>
          <a-slider
            v-model:value="options.contrast"
            :min="-100"
            :max="100"
          />
        </div>
        <div class="opt slider">
          <span class="opt-label">高斯模糊半径 {{ options.blurRadius }}</span>
          <a-slider
            v-model:value="options.blurRadius"
            :min="0"
            :max="6"
          />
        </div>
        <div class="opt slider">
          <span class="opt-label">锐化强度 {{ options.sharpenAmount }}</span>
          <a-slider
            v-model:value="options.sharpenAmount"
            :min="0"
            :max="100"
          />
        </div>
        <div class="opt slider">
          <span class="opt-label">
            二值化窗口 {{ options.thresholdBlock }}
          </span>
          <a-slider
            v-model:value="options.thresholdBlock"
            :min="0"
            :max="40"
          />
        </div>
        <div class="opt slider">
          <span class="opt-label">二值化偏移 {{ options.thresholdC }}</span>
          <a-slider
            v-model:value="options.thresholdC"
            :min="0"
            :max="30"
          />
        </div>
      </div>

      <div class="footnote">
        提示：调整参数后需再次点击「生成图片并优化」生效。所有算子在 Worker 内的
        WebAssembly 中执行，主线程只负责采集与调度。
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.scanner-page {
  height: 100%;
  overflow-y: auto;
  padding: 20px 24px 40px;
  background: #f5f6f8;
  color: #1f2329;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;

  h1 {
    margin: 0 0 4px;
    font-size: 20px;
    font-weight: 600;
  }
}

.subtitle {
  margin: 0;
  color: #646a73;
  font-size: 13px;
}

.tech-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.error-alert {
  margin-bottom: 16px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: #fff;
  border: 1px solid rgba(5, 5, 5, 0.06);
  border-radius: 8px;
  padding: 16px;
}

.panel-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.preview-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #1a1a1a;
  border-radius: 6px;
  overflow: hidden;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #fff;
  text-align: center;
  padding: 16px;

  .hint {
    margin: 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.65);
    max-width: 320px;
  }
}

// 自动巡边得到的红色框
.detect-box {
  position: absolute;
  border: 2px solid #ff3b30;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35) inset;
  pointer-events: none;
  transition:
    left 0.12s linear,
    top 0.12s linear,
    width 0.12s linear,
    height 0.12s linear;

  // 四边形模式：用一层半透明红色填充 + clip-path 描出轮廓。
  // 元素铺满整个画面，视觉上就是"框住文档"的效果。
  &.quad {
    border: none;
    box-shadow: none;
    background: rgba(255, 59, 48, 0.14);
    // 裁剪区域之外再画一圈描边：用 drop-shadow 模拟外框线
    filter: drop-shadow(0 0 0 #ff3b30);

    .box-label {
      // clip-path 会裁掉外部元素，标签只能放在四边形内部
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.hint-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #d9d9d9;
  color: #fff;
  font-size: 10px;
  cursor: help;
  vertical-align: middle;
}

.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 2px solid #ff3b30;

  &.tl {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
  }
  &.tr {
    top: -2px;
    right: -2px;
    border-left: none;
    border-bottom: none;
  }
  &.bl {
    bottom: -2px;
    left: -2px;
    border-right: none;
    border-top: none;
  }
  &.br {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
  }
}

.box-label {
  position: absolute;
  top: -22px;
  left: 0;
  background: #ff3b30;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  padding: 0 6px;
  border-radius: 3px;
  white-space: nowrap;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.result-wrap {
  position: relative;
  width: 100%;
  min-height: 260px;
  background: #fafafa;
  border: 1px dashed rgba(5, 5, 5, 0.15);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.result-canvas {
  max-width: 100%;
  display: block;
}

.result-placeholder {
  position: absolute;
  color: #8f959e;
  font-size: 13px;
  pointer-events: none;
}

.timings {
  margin-top: 16px;
}

.timings-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
}

.muted {
  color: #8f959e;
  font-weight: 400;
  font-size: 12px;
}

// 宽高比诊断配色：绿=贴近身份证标准，黄=偏差大，红=明显不是身份证
.ratio-good {
  color: #389e0d;
  font-weight: 600;
}
.ratio-fair {
  color: #d48806;
  font-weight: 600;
}
.ratio-bad {
  color: #cf1322;
  font-weight: 600;
}

.timing-row {
  display: grid;
  grid-template-columns: 96px 1fr 64px;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}

.timing-name {
  color: #646a73;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timing-bar {
  height: 8px;
  background: #eef0f3;
  border-radius: 4px;
  overflow: hidden;
}

.timing-bar-inner {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #1677ff, #4096ff);
}

.timing-ms {
  text-align: right;
  color: #1f2329;
  font-variant-numeric: tabular-nums;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px 20px;
}

.opt {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;

  &.slider {
    display: block;
  }
}

.opt-label {
  display: block;
  color: #646a73;
  margin-bottom: 2px;
}

.presets {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.footnote {
  margin-top: 14px;
  color: #8f959e;
  font-size: 12px;
}

.mt {
  margin-top: 12px;
}
</style>

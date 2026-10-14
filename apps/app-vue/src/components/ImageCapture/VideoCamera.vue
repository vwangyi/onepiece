<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import type { ShutterButtonEmits } from './ShutterButton.type';
import ShutterButton from './ShutterButton.vue';

/**
 * 摄像头预览。
 * 负责「打开 / 关闭摄像头」这件资源型的事，并把快门事件透传给上层。
 */
const videoRef = useTemplateRef<HTMLVideoElement>('videoRef');

/** 显式声明透传的事件，父组件的 handler 参数才能被 vue-tsc 推导出来 */
const emit = defineEmits<ShutterButtonEmits>();

let mediaStream: MediaStream | null = null;

/** 打开摄像头；重复调用会先释放上一次的流，避免摄像头被独占 */
async function openCamera() {
  stopCamera();

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        // 需要指定某颗摄像头时打开下面这行（deviceId 来自 enumerateDevices）
        // deviceId: { exact: cameraId },
        facingMode: 'user' // 前置摄像头；'environment' 为后置
      },
      audio: false
    });

    const video = videoRef.value;
    if (!video) {
      stopCamera();
      return;
    }

    video.srcObject = mediaStream;
    await video.play();
  } catch (err) {
    // 用户拒绝授权 / 没有摄像头 / 非安全上下文都会走到这里
    console.error('[VideoCamera] 打开摄像头失败', err);
    stopCamera();
  }
}

/** 释放摄像头，否则组件销毁后设备指示灯会一直亮 */
function stopCamera() {
  mediaStream?.getTracks().forEach(track => track.stop());
  mediaStream = null;

  const video = videoRef.value;
  if (video) {
    video.srcObject = null;
  }
}

onMounted(openCamera);
onBeforeUnmount(stopCamera);

defineExpose({ openCamera, stopCamera });
</script>

<template>
  <div class="camera">
    <video
      ref="videoRef"
      class="preview"
      playsinline
      muted
    />
    <!-- videoRef 挂载前为 null，此时不渲染，避免用 ! 掩盖空值 -->
    <div
      v-if="videoRef"
      class="shutter"
    >
      <ShutterButton
        :video="videoRef"
        @click-shutter="emit('click-shutter', $event)"
      ></ShutterButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.camera {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.shutter {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>

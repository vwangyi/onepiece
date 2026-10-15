<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import type { ShutterButtonEmits } from '../types/ShutterButton';
import ShutterButton from './ShutterButton.vue';

const videoRef = useTemplateRef<HTMLVideoElement>('videoRef');
const emit = defineEmits<ShutterButtonEmits>();
let mediaStream: MediaStream | null = null;

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

function stopCamera() {
  mediaStream?.getTracks().forEach(track => track.stop());
  mediaStream = null;

  const video = videoRef.value;
  if (video) {
    video.srcObject = null;
  }
}

onMounted(openCamera);
// model弹窗设置了 destroy-on-close 销毁时清理摄像头
onBeforeUnmount(stopCamera);
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

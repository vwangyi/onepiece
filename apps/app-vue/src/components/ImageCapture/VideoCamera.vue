<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import ShutterButton from './ShutterButton.vue';

const videoRef = useTemplateRef('videoRef');

let imageCanvas: HTMLCanvasElement | null = null;

async function openCamera() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log('devices', devices);
  const cameras = devices.filter(
    // && device.label.includes('iPhone')
    device => device.kind === 'videoinput'
  );

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      // deviceId: { exact: cameras[0]?.deviceId || cameras[0]?.groupId || '' }
      // facingMode: 'environment'
      facingMode: 'user' // 前置摄像头；'environment' 为后置
    },
    audio: false
  });
  if (videoRef.value) {
    videoRef.value.srcObject = mediaStream;
    await videoRef.value.play();
  }

  console.log('mediaStream', mediaStream);
}
function createCanvas() {
  if (!imageCanvas) {
    imageCanvas = document.createElement('canvas');
    const ctx = imageCanvas.getContext('2d');
  }
}

onMounted(() => {
  createCanvas();
  openCamera();
});

defineExpose({
  openCamera
});
</script>

<template>
  <div class="camera">
    <video
      ref="videoRef"
      class="preview"
      playsinline
      muted
    />
    <div class="shutter">
      <ShutterButton
        v-bind="$attrs"
        :video-width="2"
        :video-height="3"
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

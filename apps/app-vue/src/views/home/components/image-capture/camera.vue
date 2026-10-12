<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import Shutter from './shutter.vue';

const videoRef = useTemplateRef('videoRef');
async function openCamera() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log('devices', devices);
  const cameras = devices.filter(
    device => device.kind === 'videoinput' && device.label.includes('iPhone')
  );
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      deviceId: { exact: cameras[0]?.deviceId || '' }
      // facingMode: 'environment'
      // facingMode: 'user' // 前置摄像头；'environment' 为后置
    },
    audio: false
  });
  if (videoRef.value) {
    videoRef.value.srcObject = mediaStream;
    await videoRef.value.play();
  }

  console.log('mediaStream', mediaStream);
}

onMounted(() => {
  openCamera();
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
      <Shutter></Shutter>
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

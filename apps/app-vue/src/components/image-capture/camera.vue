<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import Shutter from './shutter.vue';

const videoRef = useTemplateRef('videoRef');
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
let imageCanvas: HTMLCanvasElement | null = null;
function createCanvas() {
  if (!imageCanvas) {
    imageCanvas = document.createElement('canvas');
    const ctx = imageCanvas.getContext('2d');
  }
}

function clickShutter() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const video = videoRef.value;
  ctx!.drawImage(video!, 0, 0, video!.videoWidth!, video!.videoHeight!);
  const imageBase64 = canvas.toDataURL('image/png');
  console.log('imageBase64', imageBase64);
  // const blob = canvas.toBlob(() => {}, 'image/png', 1);

  // toDataURL() → Base64 字符串（方便但有 37% 体积膨胀）
  // toBlob() → 二进制 Blob（下载/上传首选，推荐替换掉 toDataURL）
  // convertToBlob() → Promise<Blob>（OffscreenCanvas / Worker 用）
  // getImageData() / transferToImageBitmap() / captureStream() → 更专业的像素、合成、录制用途
  // 日常"生成图片并保存"，用 toBlob() 是当前最佳实践。
}
onMounted(() => {
  createCanvas();
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
      <Shutter v-bind="$attrs"></Shutter>
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

<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';
import ImageCapture from '@/components/ImageCapture';
import { ref, computed } from 'vue';

import { useImageCaptureStore } from '@/stores/image-capture';

const imageCaptureStore = useImageCaptureStore();

const open = computed({
  get: () => imageCaptureStore.open,
  set: v => imageCaptureStore.updateOpen(v)
});

const selectedKeys = computed({
  get: () => imageCaptureStore.selectedKeys,
  set: (v: string[]) => imageCaptureStore.updateSelectedKeys(v)
});

const expandedKeys = computed({
  get: () => imageCaptureStore.expandedKeys,
  set: (v: string[]) => imageCaptureStore.updateExpandedKeys(v)
});

const treeData = computed({
  get: () => imageCaptureStore.treeData,
  set: (v: TreeProps['treeData']) => imageCaptureStore.updateTreeData(v)
});

setInterval(() => {
  imageCaptureStore.test = imageCaptureStore.test + 1;
}, 2000);
</script>

<template>
  <div class="home">
    {{ imageCaptureStore.test }}
    <ImageCapture
      v-model:open="open"
      v-model:selected-keys="selectedKeys"
      v-model:expanded-keys="expandedKeys"
      v-model:tree-data="treeData"
    >
    </ImageCapture>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/coffee2.jpeg');
}
</style>

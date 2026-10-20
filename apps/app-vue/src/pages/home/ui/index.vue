<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';
import ImageCapture from './ImageCapture';
import { computed } from 'vue';
import { useImageCaptureStore } from '../model/image-capture';

const imageCaptureStore = useImageCaptureStore();

const open = computed({
  get: () => imageCaptureStore.state.open,
  set: v => imageCaptureStore.updateOpen(v)
});

const selectedKeys = computed({
  get: () => imageCaptureStore.state.selectedKeys as string[],
  set: (v: string[]) => imageCaptureStore.updateSelectedKeys(v)
});

const expandedKeys = computed({
  get: () => imageCaptureStore.state.expandedKeys as string[],
  set: (v: string[]) => imageCaptureStore.updateExpandedKeys(v)
});

const treeData = computed({
  get: () => imageCaptureStore.state.treeData as TreeProps['treeData'],
  set: (v: TreeProps['treeData']) => imageCaptureStore.updateTreeData(v)
});
</script>

<template>
  <div class="home">
    <ImageCapture
      v-model:open="open"
      v-model:selected-keys="selectedKeys"
      v-model:expanded-keys="expandedKeys"
      v-model:tree-data="treeData"
    >
    </ImageCapture>

    <GoToAdmin></GoToAdmin>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('./coffee.png');
}
</style>

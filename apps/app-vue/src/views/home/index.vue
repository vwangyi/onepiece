<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';
import ImageCapture from '@/components/ImageCapture';
import { ref } from 'vue';

const open = ref<boolean>(false);
const selectedKeys = ref<string[]>(['0-0']);
const expandedKeys = ref<string[]>(['0-0']);
const treeData = ref<TreeProps['treeData']>([
  {
    title: '身份证人像页',
    key: '0-0',
    children: []
  },
  {
    title: '身份证人像页',
    key: '0-0-8',
    children: []
  },
  {
    title: '身份证国徽页',
    key: '0-1',
    children: []
  }
]);
</script>

<template>
  <ImageCapture
    v-model:open="open"
    v-model:selected-keys="selectedKeys"
    v-model:expanded-keys="expandedKeys"
    v-model:tree-data="treeData"
  >
  </ImageCapture>
</template>

<style lang="scss" scoped>
.tag {
  margin: 8px;
  cursor: pointer;
}
</style>

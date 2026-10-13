<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import ImageCapture from '@/components/image-capture/index.vue';
import { ref } from 'vue';
import { P } from 'vue-router/dist/index-BN0B0y8a.js';
import { ManOutlined } from '@ant-design/icons-vue';
const router = useRouter();

const open = ref(false);
const directoryTree = ref([]);

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
function handleClickShutter() {
  const newItem = {
    title: `image${Math.floor(Math.random() * 10)}.png`,
    key: `0--12-3${Math.random()}`,
    isLeaf: true,
    selectable: false
  };

  treeData.value = treeData.value?.map(item => {
    if (selectedKeys.value.includes(String(item.key))) {
      item.children?.unshift(newItem);
      return { ...item };
    }
    return { ...item };
  });
}
</script>

<template>
  <ImageCapture
    v-model:open="open"
    v-model:selected-keys="selectedKeys"
    v-model:expanded-keys="expandedKeys"
    :tree-data="treeData"
    @click-shutter="handleClickShutter"
  >
  </ImageCapture>
</template>

<style lang="scss" scoped>
.tag {
  margin: 8px;
  cursor: pointer;
}
</style>

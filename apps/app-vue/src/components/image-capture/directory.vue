<script lang="ts" setup>
import type { TreeProps } from 'ant-design-vue';
import { ref } from 'vue';

const expandedKeys = ref<string[]>(['0-0', '0-1']);
const selectedKeys = ref<string[]>([]);
const treeData: TreeProps['treeData'] = [
  {
    title: '身份证人像页',
    key: '0-0',
    children: [
      {
        title: 'image4.png',
        key: '0-0-0',
        isLeaf: true
      },
      {
        title: 'image3.png',
        key: '0-0-1',
        isLeaf: true
      }
    ]
  },
  {
    title: '身份证人像页',
    key: '0-0-8',
    children: [
      {
        title: 'image9.png',
        key: '0-0-8-0',
        isLeaf: true
      },
      {
        title: 'image8.png',
        key: '0-0-8-1',
        isLeaf: true
      }
    ]
  },
  {
    title: '身份证国徽页',
    key: '0-1',
    children: [
      {
        title: 'image1.png',
        key: '0-1-0',
        isLeaf: true
      },
      {
        title: 'image2.png',
        key: '0-1-1',
        isLeaf: true
      }
    ]
  }
];
</script>

<template>
  <a-directory-tree
    v-model:expanded-keys="expandedKeys"
    v-model:selected-keys="selectedKeys"
    :tree-data="treeData"
    multiple
  ></a-directory-tree>
</template>

<style></style>

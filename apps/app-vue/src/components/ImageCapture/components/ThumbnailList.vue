<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';
import { computed } from 'vue';
interface ThumbnailListProps {
  selectedKeys: string[];
  expandedKeys: string[];
  treeData: TreeProps['treeData'];
}
const props = defineProps<ThumbnailListProps>();

const thumbnailList = computed(() => {
  return props.treeData?.find(item =>
    props.selectedKeys.includes(String(item.key))
  )?.children;
});
</script>

<template>
  <div class="thumbnail-list">
    <div
      v-for="item in thumbnailList"
      :key="item.key"
      class="thumbnail-item"
    >
      <i>删除按钮</i>
      <img :src="item.img" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thumbnail-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  width: 770px;
  height: 100%;
  margin: 20px 0;
  overflow-x: scroll;
}

.thumbnail-item {
  flex: 0 0 200px;
  height: 100%;
  margin: 0 8px;
  > img {
    width: 100%;
    height: 100%;
  }
}
</style>

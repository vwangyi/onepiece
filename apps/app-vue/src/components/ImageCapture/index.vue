<script lang="ts" setup>
import { ref } from 'vue';
import type { TreeProps } from 'ant-design-vue';
import DirectoryTree from './DirectoryTree.vue';
import Camera from './camera.vue';
import Thumbnail from './thumbnail.vue';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

interface Props {
  open: boolean;
  selectedKeys: string[];
  expandedKeys: string[];
  treeData: TreeProps['treeData'];
}
const props = defineProps<Props>();
const emit = defineEmits([
  'update:open',
  'update:selectedKeys',
  'update:expandedKeys',
  'update:treeData'
]);

const handleOk = (e: MouseEvent) => {
  console.log(e);
};
function handleClickShutter() {
  const newItem = {
    title: `image${Math.floor(Math.random() * 10)}.png`,
    key: `0--12-3${Math.random()}`,
    isLeaf: true,
    selectable: false
  };

  const newTreeData = props.treeData?.map(item => {
    if (props.selectedKeys.includes(String(item.key))) {
      item.children?.unshift(newItem);
      return { ...item };
    }
    return { ...item };
  });
  emit('update:treeData', newTreeData);
}
</script>

<template>
  <slot>
    <a-tag
      class="tag no-select"
      color="purple"
      @click="$emit('update:open', true)"
    >
      影像采集
    </a-tag>
  </slot>
  <div>
    <a-modal
      :open="props.open"
      title="影像采集"
      :footer="null"
      width="1000px"
      style="top: 50px"
      @update:open="(flag: boolean) => $emit('update:open', flag)"
      @ok="handleOk"
    >
      <div class="container">
        <div class="dir">
          <DirectoryTree
            :selected-keys="selectedKeys"
            :expanded-keys="expandedKeys"
            :tree-data="treeData"
          ></DirectoryTree>
        </div>
        <div class="video">
          <Camera @click-shutter="handleClickShutter"></Camera>
          <Thumbnail
            class="thumbnail"
            v-bind="$attrs"
          ></Thumbnail>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  cursor: pointer;
}
.container {
  display: flex;
}
.dir {
  width: 230px;
  height: 540px;
  overflow: auto;
  // outline: 1px solid red;
}
.video {
  width: 770px;
  height: 400px;
  overflow: hidden;
  // outline: 1px solid red;
}
.thumbnail {
  width: 770px;
  height: 140px;
  overflow: hidden;
  // outline: 1px solid red;
}
</style>

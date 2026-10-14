<script lang="ts" setup>
import type { TreeProps } from 'ant-design-vue';
import DirectoryTree from './DirectoryTree.vue';
import VideoCamera from './VideoCamera.vue';
import Thumbnail from './thumbnail.vue';

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
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // const video = videoRef.value;

  // console.log('aa', aa);
  // return;
  // ctx!.drawImage(video!, 0, 0, video!.videoWidth!, video!.videoHeight!);
  // const imageBase64 = canvas.toDataURL('image/png');
  // console.log('imageBase64', imageBase64);
  // // const blob = canvas.toBlob(() => {}, 'image/png', 1);

  // // toDataURL() → Base64 字符串（方便但有 37% 体积膨胀）
  // // toBlob() → 二进制 Blob（下载/上传首选，推荐替换掉 toDataURL）
  // // convertToBlob() → Promise<Blob>（OffscreenCanvas / Worker 用）
  // // getImageData() / transferToImageBitmap() / captureStream() → 更专业的像素、合成、录制用途
  // // 日常"生成图片并保存"，用 toBlob() 是当前最佳实践。

  // const newItem = {
  //   title: `image${Math.floor(Math.random() * 10)}.png`,
  //   key: `0--12-3${Math.random()}`,
  //   isLeaf: true,
  //   selectable: false
  // };

  // const newTreeData = props.treeData?.map(item => {
  //   if (props.selectedKeys.includes(String(item.key))) {
  //     item.children?.unshift(newItem);
  //     return { ...item };
  //   }
  //   return { ...item };
  // });
  // emit('update:treeData', newTreeData);
}
</script>

<template>
  <div>
    <slot>
      <a-tag
        class="tag no-select"
        color="purple"
        @click="$emit('update:open', true)"
      >
        影像采集
      </a-tag>
    </slot>
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
          <VideoCamera @click-shutter="handleClickShutter"></VideoCamera>
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

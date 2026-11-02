<script lang="ts" setup>
import type { TreeProps } from 'ant-design-vue';
import DirectoryTree from './components/DirectoryTree.vue';
import VideoCamera from './components/VideoCamera.vue';
import ThumbnailList from './components/ThumbnailList.vue';
import type { ClickShutterPayload } from './types/ShutterButton.js';
import { computed } from 'vue';

const props = defineProps<{
  open: boolean;
  selectedKeys: string[];
  expandedKeys: string[];
  treeData: TreeProps['treeData'];
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  'update:selectedKeys': [value: string[]];
  'update:expandedKeys': [value: string[]];
  'update:treeData': [value: TreeProps['treeData']];
}>();

function handleClickShutter({ video }: ClickShutterPayload) {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageBase64 = canvas.toDataURL('image/png');
  // toDataURL() → Base64 字符串（方便但有 37% 体积膨胀）
  // toBlob() → 二进制 Blob（下载/上传首选，推荐替换掉 toDataURL）
  // convertToBlob() → Promise<Blob>（OffscreenCanvas / Worker 用）
  // getImageData() / transferToImageBitmap() / captureStream() → 更专业的像素、合成、录制用途
  // 日常"生成图片并保存"，用 toBlob() 是当前最佳实践。
  console.log('imageBase64', imageBase64);

  const newItem = {
    title: `image${Math.floor(Math.random() * 10)}.png`,
    key: crypto.randomUUID(),
    isLeaf: true,
    // selectable: false,
    img: imageBase64
  };

  const newTreeData = props.treeData?.map(item => {
    if (props.selectedKeys.includes(String(item.key))) {
      const children = [newItem, ...(item.children ?? [])];
      return { ...item, children };
    }
    return { ...item };
  });

  emit('update:treeData', newTreeData);
}

const total = computed(() => {
  const res = props.treeData?.reduce((prev, curr) => {
    const itemLength = curr?.children?.length || 0;
    prev += itemLength;
    return prev;
  }, 0);
  if (res === 0) return '';
  return res;
});
</script>

<template>
  <div>
    <slot>
      <a-tag
        class="tag no-select"
        color="purple"
        @click="emit('update:open', true)"
      >
        影像采集{{ total }}
      </a-tag>
    </slot>
    <a-modal
      :open="props.open"
      title="影像采集"
      :footer="null"
      width="1000px"
      style="top: 50px"
      destroy-on-close
      @update:open="(v: boolean) => emit('update:open', v)"
    >
      <div class="container">
        <div class="dir">
          <DirectoryTree
            :selected-keys="selectedKeys"
            :expanded-keys="expandedKeys"
            :tree-data="treeData"
            @update:selected-keys="
              (v: string[]) => emit('update:selectedKeys', v)
            "
            @update:expanded-keys="
              (v: string[]) => emit('update:expandedKeys', v)
            "
          ></DirectoryTree>
        </div>
        <div class="video-container">
          <VideoCamera
            class="video"
            @click-shutter="handleClickShutter"
          ></VideoCamera>
          <div class="thumbnail">
            <ThumbnailList
              :selected-keys="selectedKeys"
              :expanded-keys="expandedKeys"
              :tree-data="treeData"
            ></ThumbnailList>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  margin: 8px;
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

.video-container {
  height: 540px;
  width: 770px;
  display: flex;
  flex-direction: column;
}
.video {
  width: 770px;
  height: 400px;
  overflow: hidden;
}
.thumbnail {
  width: 770px;
  height: 140px;
  overflow: hidden;
}
</style>

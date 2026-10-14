<script lang="ts" setup>
import type { TreeProps } from 'ant-design-vue';
import DirectoryTree from './DirectoryTree.vue';
import VideoCamera from './VideoCamera.vue';
import ThumbnailList from './ThumbnailList.vue';
import type { ClickShutterPayload } from './ShutterButton.type';

// attrs 手动透传给 Thumbnail，而不是落在根节点上
defineOptions({ inheritAttrs: false });

interface Props {
  open: boolean;
  selectedKeys: string[];
  expandedKeys: string[];
  treeData: TreeProps['treeData'];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  'update:selectedKeys': [value: string[]];
  'update:expandedKeys': [value: string[]];
  'update:treeData': [value: TreeProps['treeData']];
}>();

function handleClickShutter({ video }: ClickShutterPayload) {
  // canvas 的默认尺寸是 300x150，不同步 video 尺寸会把画面压扁
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('[ImageCapture] 获取 canvas 2d 上下文失败');
    return;
  }

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageBase64 = canvas.toDataURL('image/png');

  // toDataURL() → Base64 字符串（方便但有 37% 体积膨胀）
  // toBlob() → 二进制 Blob（下载/上传首选，推荐替换掉 toDataURL）
  // convertToBlob() → Promise<Blob>（OffscreenCanvas / Worker 用）
  // getImageData() / transferToImageBitmap() / captureStream() → 更专业的像素、合成、录制用途
  // 日常"生成图片并保存"，用 toBlob() 是当前最佳实践。
  console.log('imageBase64', imageBase64);

  const newItem = {
    title: `image${Math.floor(Math.random() * 10)}.png`,
    key: `0--12-3${Math.random()}`,
    isLeaf: true,
    // selectable: false,
    img: imageBase64
  };

  const newTreeData = props.treeData?.map(item => {
    if (props.selectedKeys.includes(String(item.key))) {
      return { ...item, children: [newItem, ...(item.children ?? [])] };
    }
    return { ...item };
  });

  emit('update:treeData', newTreeData);
}
</script>

<template>
  <div>
    <slot>
      <a-tag
        class="tag no-select"
        color="purple"
        @click="emit('update:open', true)"
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
      @update:open="(flag: boolean) => emit('update:open', flag)"
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

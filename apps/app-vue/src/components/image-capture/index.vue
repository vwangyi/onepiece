<script lang="ts" setup>
import { ref } from 'vue';
import Directory from './directory.vue';
import Camera from './camera.vue';
import Thumbnail from './thumbnail.vue';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:open']);
// const open = ref<boolean>(false);

console.log('$attrs', attrs);
const showModal = () => {};

const handleOk = (e: MouseEvent) => {
  console.log(e);
};
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
          <Directory v-bind="$attrs"></Directory>
        </div>
        <div class="video">
          <Camera v-bind="$attrs"></Camera>
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

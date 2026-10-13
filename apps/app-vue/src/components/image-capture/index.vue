<script lang="ts" setup>
import { ref } from 'vue';
import Directory from './directory.vue';
import Camera from './camera.vue';
import Thumbnail from './thumbnail.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:open']);
// const open = ref<boolean>(false);

const showModal = () => {
  // open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  // open.value = false;
};
</script>

<template>
  <slot>
    <a-tag
      class="tag no-select"
      color="purple"
      @click="showModal"
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
          <Directory></Directory>
        </div>
        <div class="video">
          <Camera></Camera>
          <Thumbnail class="thumbnail"></Thumbnail>
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
  // outline: 1px solid red;
}
.video {
  width: 770px;
  height: 400px;
  // outline: 1px solid red;
}
.thumbnail {
  width: 770px;
  height: 140px;
  outline: 1px solid red;
}
</style>

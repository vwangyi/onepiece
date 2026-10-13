<script setup lang="ts">
import { useRouter } from 'vue-router';
import ImageCapture from '@/components/image-capture/index.vue';
import { ref } from 'vue';
const router = useRouter();

const open = ref(false);
const directoryTree = ref([]);
function handleClickShutter() {}
</script>

<template>
  <ImageCapture
    v-model:open="open"
    :directory-tree="directoryTree"
    @click-shutter="handleClickShutter"
  >
    <!-- <a-tag
      class="tag no-select"
      color="purple"
      @click="open = true"
    >
      影像采集1
    </a-tag> -->
  </ImageCapture>
</template>

<style lang="scss" scoped>
.tag {
  margin: 8px;
  cursor: pointer;
}
</style>

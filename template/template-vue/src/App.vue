<script setup lang="ts">
import { ref } from 'vue';
import config from '@/config/index';

console.log(config);

const version = ref(config.APP_VERSION);
const env = ref(config.NODE_ENV);
const port = ref(config.PORT);
const BUILD_TOOLS = ref(config.BUILD_TOOLS);
const text = ref('');
</script>

<template>
  <div class="box">hello :{{ env }}</div>
  <input
    type="text"
    v-model="text"
  />
  <div>hello :{{ version }}</div>
  <div>hello :{{ port }}</div>
  <div>hello :{{ BUILD_TOOLS }}</div>

  <img
    class="img"
    src="./assets/lufei.jpeg"
    alt="路飞"
  />
</template>

<style lang="scss" scoped>
.box {
  color: red;
}
.img {
  width: 200px;
  height: 300px;
}
</style>

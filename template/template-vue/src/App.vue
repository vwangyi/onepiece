<script setup lang="ts">
import { ref } from 'vue';
import config from '@/config/index.ts';

console.log(config);

const version = ref(config.APP_VERSION);
const env = ref(config.NODE_ENV);
const port = ref(config.PORT);
</script>

<template>
  <div class="box">hello :{{ env }}</div>
  <div>hello :{{ version }}</div>
  <div>hello :{{ port }}</div>

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

<script setup>
import { ref } from 'vue';
import config from './config/index';

console.log(config);

const version = ref(config.APP_VERSION);
const env = ref(config.NODE_ENV);
const port = ref(config.PORT);
</script>

<template>
  <div>hello :{{ env }}</div>
  <div>hello :{{ version }}</div>
  <div>hello :{{ port }}</div>
</template>

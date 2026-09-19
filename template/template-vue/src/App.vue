<script setup>
import { ref } from 'vue';
console.log('hello', process.env.NODE_ENV, __APP_VERSION__);

const version = ref(__APP_VERSION__);
const env = ref(process.env.NODE_ENV);
</script>

<template>
  <div>hello :{{ env }}</div>
  <div>hello :{{ version }}</div>
</template>

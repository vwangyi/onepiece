<script setup lang="ts">
import { provide, ref } from 'vue';
import { useCounterStore } from '@/stores/counter.ts';

const counterStore = useCounterStore();
const list = ref(1);

provide('list', list);
</script>

<template>
  <CompoA :list="[counterStore.count]" />
</template>

<style scoped></style>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { useCounterStore } from '@/stores/counter.ts';

const counterStore = useCounterStore();
const list = ref(1);

provide('list', list);

// 1. 重载签名（多个）
function greet(name: string): string;
function greet(age: number): string;

// 2. 实现签名（一个）
function greet(value: string | number): string {
  if (typeof value === 'string') {
    return `Hello, ${value}`;
  } else {
    return `Age: ${value}`;
  }
}

// 使用
greet('Alice'); // 正确
greet(25); // 正确
// greet(true); // 错误：参数类型不匹配
</script>

<template>
  <CompoA :list="[counterStore.count]" />
</template>

<style scoped></style>

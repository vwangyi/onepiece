<template>
    <button :style="{ color: color }" @click="handleClick">
      <slot />
    </button>
  </template>
  
  <script setup>
  defineProps(['color'])
  const handleClick = () => alert('Hello from VitePress!')
  </script>
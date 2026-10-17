<script setup lang="ts">
/**
 * 404 页面
 *
 * 原本是 JSX 写的 index.tsx，但 vite 对 .tsx 走的是 esbuild 的 React JSX 转换，
 * 与本项目的 Vue JSX（@vitejs/plugin-vue-jsx）不一致，会编译失败。
 * 这里统一改为 SFC 写法，与项目其他页面保持一致。
 */
import './index.scss';
</script>

<template>
  <div class="big">Not Found</div>
</template>

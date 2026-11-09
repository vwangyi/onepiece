<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
function openSubApp() {
  console.log('a');
  router.push('/vue-child');
}
</script>

<template>
  <div>
    <h2>基座主应用</h2>
    <router-link to="/">首页</router-link> |
    <div @click="openSubApp">打开Vue子应用</div>
    <!-- 子应用会渲染在这里 -->
    <div id="micro-container"></div>
  </div>
</template>

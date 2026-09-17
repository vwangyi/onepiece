<script setup lang="ts">
/**
 * 调试信息 全局组件
 * 
 * 好处1: 对于任何不熟悉的页面 都可以知道路由是什么
 */
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
    <div class="debug-info">
        <div>路由：{{ route.path }}</div>
    </div>
</template>

<style scoped>
.debug-info {
    position: absolute;
    width: 100vw;
    height: 100vh;
    font-size: 30px;
    color: red;
}
</style>
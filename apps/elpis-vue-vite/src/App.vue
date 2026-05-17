<script setup lang="ts">
import { RouterView } from 'vue-router';

console.log('环境APP ', import.meta.env);
// import { a, b, c, default as all1 } from './a.js'; // 拿了所有的具名导出和默认导出
// import { a as aa, default as all2 } from './a.js'; // 只拿了一个具名导出 和 默认导出

// import { default as all3 } from './a.js'; // 只拿了默认导出
// import all4 from './a.js'; // 只拿了默认导出

// import all6, { a as aaa, b as bbb } from './a.js'; // all6是默认导出 a和b是具名导出 用as是重命名防止命名冲突

// import * as all from './a.js'; // 同时拿了默认导出和具名导出 all.a 和 all.default

// console.log(a, b, c, all1);
// console.log(a, b, c, d, e, f, g, h, i, j, all1);
// console.log(aa, all2);
// console.log(all3);
// console.log(all4);
// console.log(all6, aaa, bbb);
// console.log(all);

// const vk;
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

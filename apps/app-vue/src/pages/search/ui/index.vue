<script setup lang="ts">
import { ref } from 'vue';
interface LinkData {
  key: symbol;
  logo: string;
  link: string;
  title: string;
}
const links = ref<LinkData[]>([
  {
    key: Symbol(),
    logo: '',
    title: 'google',
    link: 'google.com'
  }
]);
</script>
<template></template>

<style lang="scss" scoped></style>

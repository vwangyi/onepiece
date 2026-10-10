<script setup lang="ts">
import { useRouter } from 'vue-router';
import ShutterButton from '@/components/ShutterButton/index.vue';
import { ref } from 'vue';
const router = useRouter();
function handleClick(e: Event) {
  // router.push('/demo');
  console.log(11111111, e);
}

const colors = ref([
  'pink',
  'red',
  'orange',
  'green',
  'cyan',
  'blue',
  'purple',
  'pink',
  'pink'
]);
</script>

<template>
  <a-tag
    v-for="value in 100"
    :key="value"
    class="tag no-select"
    color="purple"
  >
    purple
  </a-tag>
  <ShutterButton @click="handleClick"></ShutterButton>
</template>

<style lang="scss" scoped>
.tag {
  margin: 8px;
  cursor: pointer;
}
</style>

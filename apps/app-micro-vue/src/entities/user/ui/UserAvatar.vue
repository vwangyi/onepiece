<script setup lang="ts">
interface Props {
  src?: string;
  name: string;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  src: '/default-avatar.png',
  size: 40
});
</script>

<template>
  <img
    :src="props.src"
    :alt="props.name"
    :width="props.size"
    :height="props.size"
    style="border-radius: 50%"
  />
</template>

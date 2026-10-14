<script setup lang="ts">
/**
 * 快门按钮 ShutterButton
 */

import type {
  ShutterButtonEmits,
  ShutterButtonProps
} from './ShutterButton.type';

const props = defineProps<ShutterButtonProps>();
const emit = defineEmits<ShutterButtonEmits>();

function handleShutter() {
  emit('click-shutter', { video: props.video });
}
</script>

<template>
  <div
    class="shutter-button"
    @click="handleShutter"
  >
    <i class="iconfont icon-zhaoxiangji"></i>
  </div>
</template>

<style lang="scss" scoped>
$bgColor: #f00;

.shutter-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: $bgColor;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shutter-button:active {
  background-color: rgba($color: $bgColor, $alpha: 0.7);
}
.icon-zhaoxiangji {
  font-size: 32px;
  color: rgba($color: white, $alpha: 0.7);
}
</style>

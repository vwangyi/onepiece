```vue
<!-- CanvasChart.vue -->
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  width: { type: Number, default: 400 },
  height: { type: Number, default: 400 },
  data: { type: Array, default: () => [] }
})

const canvasRef = ref(null)
let ctx = null

const draw = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, props.width, props.height)
  
  // 根据 data 绘制图形
  props.data.forEach((item, index) => {
    ctx.fillStyle = item.color
    ctx.fillRect(index * 50, props.height - item.value, 40, item.value)
  })
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  draw()
})

// 监听数据变化
watch(() => props.data, draw, { deep: true })

// 组件卸载时清理（可选）
onUnmounted(() => {
  ctx = null
})
</script>


<template>
  <canvas ref="canvasRef" :width="width" :height="height"></canvas>
</template>
```






```js 
const canvas = ref(null);
function initCanvas() { 
    canvas.value = document.getElementById("canvas1"); // 假设页面上已经有了 canvas1
    canvas.value = document.createElement('canvas')
}
const ctx = canvas.getContext('2d') // 拿到canvas画布的2d画笔对象 
const webgl = canvas.getContext('webgl'); // 获取 canvas webgl对象 
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

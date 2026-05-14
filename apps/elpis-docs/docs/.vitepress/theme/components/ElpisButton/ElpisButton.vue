
  
<script>
export default { name: 'ElpisButton' };
</script>
  <script setup>
  defineProps(['color'])
  const handleClick = () => alert('Hello from VitePress!')
  </script>
  <template>
    <button :style="{ color: color }" @click="handleClick">
      <slot />
    </button>
  </template>
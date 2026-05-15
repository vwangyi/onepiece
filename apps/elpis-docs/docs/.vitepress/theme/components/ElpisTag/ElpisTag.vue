<script setup>
const props = defineProps({
    text: String,
    default: ''
})
</script> 
<script>
export default { name: 'ElpisTag' };
</script>

<template>
    <span>
        {{ `${props.text}` }}
    </span>
</template>
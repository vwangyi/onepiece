<script setup lang="ts">
import ToDoHeader from './header.vue';
import ToDoAppMain from './main.vue';
</script>

<template>
  <div class="todo">
    <ToDoHeader></ToDoHeader>
    <ToDoAppMain></ToDoAppMain>
  </div>
</template>

<style lang="scss" scoped>
.todo {
  width: 100vw;
  height: 100vh;
  background-color: rgb(37, 36, 35);
}
</style>

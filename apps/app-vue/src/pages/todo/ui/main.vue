<script setup lang="ts">
import Category from './category.vue';
import AddTask from './add-task.vue';
import Detail from './detail.vue';
</script>

<template>
  <div class="app-main">
    <div class="sidebar">
      <Category></Category>
    </div>
    <div class="content">
      <AddTask></AddTask>
    </div>
    <div class="drawer">
      <Detail></Detail>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 48px);
  background-color: #000;

  .sidebar {
    width: 290px;
    height: 100%;
    background-color: #252423;
  }
  .content {
    flex: 1;
    height: 100%;
    background-color: #11100f;
    padding: 0 24px;
  }
  .drawer {
    width: 360px;
    height: 100%;
    background-color: #252423;
  }
}
</style>

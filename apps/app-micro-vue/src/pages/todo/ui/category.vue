<script setup lang="ts">
import type { TaskCategory } from '../model/types';
import { useTodoStore } from '../model/todo';

const todoStore = useTodoStore();

function handleClickTask(task: TaskCategory) {
  todoStore.selectedTaskCategory(task);
}
</script>
<template>
  <div class="category">
    <div class="iconfont font-size-14-px icon-taiyang"></div>
  </div>
  <div
    v-for="task in todoStore.taskCategory"
    :key="task.key"
    class="category"
    :class="{ category: true, active: task.active }"
    @click="handleClickTask(task)"
  >
    <div :class="`iconfont font-size-14-px ${task.icon}`"></div>
    <div class="title">{{ task.title }}</div>
    <div>{{ task.total }}</div>
  </div>
</template>

<style lang="scss" scoped>
.category {
  width: 290px;
  height: 44px;
  padding: 12px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 200;
  border-left: 2px solid transparent;

  .title {
    margin-left: 16px;
    flex: 1;
  }
  &.active {
    border-left: 2px solid #296fe6;
    background-color: #3b3a39 !important;
  }
}

.category:hover {
  background-color: #323130;
  cursor: pointer;
}
</style>

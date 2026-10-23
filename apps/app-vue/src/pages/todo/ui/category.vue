<script setup lang="ts">
import { ref } from 'vue';

interface Task {
  key: symbol;
  icon: string;
  title: string;
  total: number;
  active: boolean;
}
const tasks = ref<Task[]>([
  {
    key: Symbol(),
    icon: 'icon-mingtian3x',
    title: '明天',
    total: 52,
    active: false
  },
  {
    key: Symbol(),
    icon: 'icon-taiyang',
    title: '我的一天',
    total: 52,
    active: true
  },
  {
    key: Symbol(),
    icon: 'icon-zhongyaorenwu',
    title: '重要',
    total: 15,
    active: false
  },
  {
    key: Symbol(),
    icon: 'icon-jihua',
    title: '计划内',
    total: 55,
    active: false
  },
  {
    key: Symbol(),
    icon: 'icon-yiwancheng',
    title: '已完成',
    total: 53,
    active: false
  },
  {
    key: Symbol(),
    icon: 'icon-quanbu',
    title: '全部',
    total: 545,
    active: false
  },

  {
    key: Symbol(),
    icon: 'icon-quanbu',
    title: '重要不紧急',
    total: 1,
    active: false
  }
]);

function handleClickTask(task: Task) {
  tasks.value = tasks.value.map((t: Task) => {
    if (t.key === task.key) {
      return { ...t, active: true };
    }
    return { ...t, active: false };
  });
  document.title = `${task.title} - To Do`;
}
</script>
<template>
  <div class="category">
    <div class="iconfont font-size-14-px icon-taiyang"></div>
  </div>
  <div
    v-for="task in tasks"
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

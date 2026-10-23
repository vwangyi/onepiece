import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Task, TaskCategory } from './types';

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<Task[]>([
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },

    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },

    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },

    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },

    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },

    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false },
    { key: Symbol(), hover: false, title: '', active: false }
  ]);

  const currentTask = computed(() => {
    return tasks.value.find(task => task.active);
  });

  const taskCategory = ref<TaskCategory[]>([
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
      icon: 'icon-jinji',
      title: '紧急',
      total: 1,
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
      icon: 'icon-renwuyanqi',
      title: '已延期',
      total: 53,
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
    }
  ]);

  /* 选中 TaskCategory */
  function selectedTaskCategory(t: TaskCategory) {
    taskCategory.value = taskCategory.value.map((tc: TaskCategory) => {
      if (tc.key === t.key) {
        return { ...tc, active: true };
      }
      return { ...tc, active: false };
    });
    document.title = `${t.title} - To Do`;
  }

  function closeDrawer() {
    tasks.value = tasks.value.map(t => ({ ...t, active: false }));
  }

  function deleteTask() {
    tasks.value = tasks.value.filter(task => !task.active);
  }
  function hovering(task: Task) {}
  function notHovering() {}

  /* 悬停checkbox */
  function hoverAtCheckbox(task: Task) {
    tasks.value = tasks.value.map(t => ({ ...t, hover: t.key === task.key }));
  }
  /* 未悬停checkbox */
  function notHoverAtCheckbox() {
    tasks.value = tasks.value.map(t => ({ ...t, hover: false }));
  }

  /* 选中 Task */
  function selectedTask(task: Task) {
    tasks.value = tasks.value.map((t: Task) => {
      if (task.key === t.key) {
        return { ...t, active: true };
      }
      return { ...t, active: false };
    });
    document.title = `${task.title} - To Do`;
  }

  return {
    closeDrawer,
    taskCategory,
    selectedTaskCategory,
    tasks,
    hovering,
    notHovering,
    hoverAtCheckbox,
    notHoverAtCheckbox,
    selectedTask,
    currentTask,
    deleteTask
  };
});

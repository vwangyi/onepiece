<script lang="ts" setup>
import { useTodoStore } from '../model/todo';

const todoStore = useTodoStore();

function handleCloseDrawer() {
  todoStore.closeDrawer();
}

function handleDeleteTask() {
  todoStore.deleteTask();
}
</script>

<template>
  <div class="drawer">
    <div class="drawer-main">
      <div class="add-task-input">
        <div class="iconfont icon-webicon206 add-task-input-icon"></div>
        <input
          type="text"
          placeholder="xxx"
          :value="new Array(100).fill('忍').join('')"
        />
      </div>
    </div>
    <div class="drawer-footer">
      <div
        class="iconfont icon-tuichu"
        @click="handleCloseDrawer"
      ></div>
      <div class="create-time">创建于今天</div>
      <div
        class="iconfont icon-shanchu-1"
        @click="handleDeleteTask"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #201f1e;
  .drawer-main {
    // flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100% - 58px);
    width: 100%;
  }
}

.add-task-input {
  width: 320px;
  min-height: 52px;
  padding: 0 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  background-color: #252423;
  // background-color: red;
  margin-top: 16px;
  .add-task-input-icon {
    width: 28px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    margin: 0 14px 0 0;
  }
  input {
    width: 100%;
  }
}

.drawer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 58px;
  border-top: solid 1px #484644; // --bg-separator
  color: #fff;
  padding: 0 24px;
  .icon-tuichu {
    width: 24px;
    height: 24px;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
  }
  .icon-shanchu-1 {
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  }
  .create-time {
    font-size: 12px;
    color: #a5a3a1;
    font-weight: 200;
  }
}
</style>

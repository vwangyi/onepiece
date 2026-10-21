<script lang="ts" setup></script>

<template>
  <div class="add-task">
    <div class="add-task-input">
      <input
        type="text"
        placeholder="添加任务"
      />
    </div>
    <div class="add-task-btn-container">
      <div class="add-task-btns">
        <div class="add-task-btn iconfont icon-jiezhiriqi"></div>
        <div class="add-task-btn iconfont icon-tixing"></div>
        <div class="add-task-btn iconfont icon-zhongfu2 font-size-24-px"></div>
      </div>
      <div class="add-task-button">添加</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-task {
  width: 100%;
  height: auto;
  background-color: #252423;
  color: #fff;
  overflow: hidden;
  border-radius: 4px;

  margin-top: 24px;
}

.add-task-input {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  font-weight: 100;
  > input {
    width: 100%;
  }
}
.add-task-btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: solid 1px #605e5c;
  width: 100%;
  height: 45px;
  padding: 0 16px 0 8px;

  .add-task-btns {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .add-task-button {
    width: 50px;
    height: 28px;
    border: 1px solid #605e5c;
    font-size: 12px;
    font-weight: 200;
    text-align: center;
    line-height: 28px;
    cursor: pointer;
    border-radius: 4px;
  }
  .add-task-button:hover {
    background-color: #323130;
    border-radius: 4px;
  }
  .add-task-btn {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    margin-left: 8px;
  }
  .add-task-btn:hover {
    background-color: #323130;
    border-radius: 4px;
  }
}
.add-task-btn.iconfont.icon-zhongfu2.font-size-24-px {
  font-size: 24px;
}
</style>

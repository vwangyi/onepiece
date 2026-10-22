<script lang="ts" setup>
import { ref } from 'vue';

interface Task {
  key: symbol;
  hover: boolean;
}

const tasks = ref([
  {
    key: Symbol(),
    hover: false
  },
  {
    key: Symbol(),
    hover: false
  },
  {
    key: Symbol(),
    hover: false
  },
  {
    key: Symbol(),
    hover: false
  }
]);

const handleMouseEnter = (task: Task) => {
  tasks.value = tasks.value.map(t => ({ ...t, hover: t.key === task.key }));
};

const handleMouseLeave = () => {
  tasks.value = tasks.value.map(t => ({ ...t, hover: false }));
};
</script>

<template>
  <div class="add-task">
    <div
      class="add-task-input"
      style="
        background-color: #11100f;
        color: #78bafd;
        font-size: 20px;
        font-weight: 400;
      "
    >
      <div class="iconfont icon-taiyang font-size-22-px"></div>
      <div style="margin-left: 8px">我的一天</div>
    </div>
    <div class="add-task-input">
      <div class="iconfont icon-jiahao add-task-input-icon"></div>
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

    <div
      v-for="(t, i) in tasks"
      :key="t.key"
      class="add-task-input"
      style="margin-top: 8px"
    >
      <div
        :class="`iconfont ${t.hover ? 'icon-webicon19' : 'icon-webicon206'} add-task-checkbox-icon`"
        @mouseenter="handleMouseEnter(t)"
        @mouseleave="handleMouseLeave"
      ></div>
      <input
        type="text"
        :placeholder="`任务${i + 1}`"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-task {
  width: 100%;
  height: auto;
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
  background-color: #252423;
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
.add-task-btn-container {
  display: flex;
  background-color: #252423;
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

// 下面是一样 后续抽离
.iconfont.icon-webicon206.add-task-checkbox-icon {
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  margin: 0 14px 0 0;
  font-size: 24px;
  color: #296fe6;
}
.iconfont.icon-webicon19.add-task-checkbox-icon {
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  margin: 0 14px 0 0;
  font-size: 24px;
  color: #296fe6;
}

.iconfont.icon-taiyang.font-size-22-px {
  font-size: 22px;
}
</style>

<script lang="ts" setup>
import { useTodoStore } from '../model/todo';

const todoStore = useTodoStore();

function handleCloseDrawer() {
  todoStore.closeDrawer();
}

function handleDeleteTask() {
  todoStore.deleteTask();
}
const handleMouseEnter = () => {
  todoStore.hoverAtCheckbox(todoStore.currentTask!);
};

const handleMouseLeave = () => {
  todoStore.notHoverAtCheckbox();
};
</script>

<template>
  <div
    v-if="todoStore.currentTask"
    class="drawer"
  >
    <div class="drawer-main">
      <div class="add-task-input">
        <div
          :class="{
            'iconfont': true,
            'add-task-checkbox-icon': true,
            'icon-webicon19': todoStore.currentTask!.hover,
            'icon-webicon206': !todoStore.currentTask!.hover
          }"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        ></div>
        <div
          contenteditable="true"
          class="input"
        >
          {{ todoStore.currentTask!.title }}
        </div>

        <div
          :class="{
            'iconfont': true,
            'add-task-checkbox-icon': true,
            'icon-zhongyao': todoStore.currentTask!.hover,
            'icon-zhongyao1': !todoStore.currentTask!.hover
          }"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        ></div>
      </div>

      <div class="add-task-day">
        <div
          :class="{
            'iconfont': true,
            'add-task-checkbox-icon': true,
            'icon-webicon19': true
            // 'icon-webicon19': todoStore.currentTask!.hover,
            // 'icon-webicon206': !todoStore.currentTask!.hover
          }"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        ></div>
        <div class="input">已添加到 “我的一天”</div>

        <div
          :class="{
            'iconfont': true,
            'add-task-checkbox-icon': true,
            'icon-zhongyao': todoStore.currentTask!.hover,
            'icon-zhongyao1': !todoStore.currentTask!.hover
          }"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        ></div>
      </div>
      <div class="warn-deadline-repeat">
        <div class="add-task-warn">
          <div
            :class="{
              'iconfont': true,
              'add-task-checkbox-icon': true,
              'icon-webicon19': true
              // 'icon-webicon19': todoStore.currentTask!.hover,
              // 'icon-webicon206': !todoStore.currentTask!.hover
            }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          ></div>
          <div class="input">已添加到 “我的一天”</div>

          <div
            :class="{
              'iconfont': true,
              'add-task-checkbox-icon': true,
              'icon-zhongyao': todoStore.currentTask!.hover,
              'icon-zhongyao1': !todoStore.currentTask!.hover
            }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          ></div>
        </div>

        <div class="add-task-deadline">
          <div
            :class="{
              'iconfont': true,
              'add-task-checkbox-icon': true,
              'icon-webicon19': true
              // 'icon-webicon19': todoStore.currentTask!.hover,
              // 'icon-webicon206': !todoStore.currentTask!.hover
            }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          ></div>
          <div class="input">已添加到 “我的一天”</div>

          <div
            :class="{
              'iconfont': true,
              'add-task-checkbox-icon': true,
              'icon-zhongyao': todoStore.currentTask!.hover,
              'icon-zhongyao1': !todoStore.currentTask!.hover
            }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          ></div>
        </div>

        <div class="add-task-repeat">
          <div
            :class="{
              'iconfont': true,
              'add-task-checkbox-icon': true,
              'icon-webicon19': true
              // 'icon-webicon19': todoStore.currentTask!.hover,
              // 'icon-webicon206': !todoStore.currentTask!.hover
            }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          ></div>
          <div class="input">已添加到 “我的一天”</div>

          <div
            :class="{
              'iconfont': true,
              'add-task-checkbox-icon': true,
              'icon-zhongyao': todoStore.currentTask!.hover,
              'icon-zhongyao1': !todoStore.currentTask!.hover
            }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          ></div>
        </div>
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
  width: 326px;
  min-height: 52px;
  // padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  background-color: #252423;
  margin-top: 16px;
  .input {
    width: 326px;
    height: auto;
    overflow-wrap: anywhere;
    word-break: break-word; /* 兼容旧浏览器兜底 */
    white-space: pre-wrap; /* 保留用户输入的换行和空格 */
    outline: none;
    font-size: 16px;
    line-height: 1.8; /* 推荐：无单位，按字体大小倍数计算 */
    font-size: 16px;
    padding: 8px 0px;
    cursor: text;
  }
}
.add-task-input:hover {
  background-color: #323130;
  cursor: pointer;
}
.iconfont.icon-webicon206.add-task-checkbox-icon {
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  font-size: 28px;
  color: #296fe6;
  margin: 0 8px;
}
.iconfont.icon-webicon19.add-task-checkbox-icon {
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  font-size: 28px;
  color: #296fe6;
  margin: 0 8px;
}

.iconfont.icon-zhongyao1.add-task-checkbox-icon {
  width: 24px;
  height: 24px;
  text-align: center;
  margin: 0 8px;
  line-height: 24px;
  font-size: 24px;
  color: #296fe6;
}
.iconfont.icon-zhongyao.add-task-checkbox-icon {
  width: 24px;
  height: 24px;
  margin: 0 8px;
  text-align: center;
  line-height: 24px;
  font-size: 24px;
  color: #296fe6;
}

.drawer-footer {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 58px;
  // border-top: solid 1px #484644; // --bg-separator
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
.drawer-footer::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  height: 0.5px;
  width: 100%;
  // background: #edebe9;
  background: #605e5c; // var(--bg-border);
}

.add-task-day {
  width: 326px;
  min-height: 52px;
  // padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  color: #78bafd;
  background-color: #252423;
  margin-top: 16px;
  .input {
    width: 326px;
    height: auto;
    overflow-wrap: anywhere;
    word-break: break-word; /* 兼容旧浏览器兜底 */
    white-space: pre-wrap; /* 保留用户输入的换行和空格 */
    outline: none;
    font-size: 16px;
    line-height: 1.8; /* 推荐：无单位，按字体大小倍数计算 */
    font-size: 16px;
    padding: 8px 0px;
  }
}
.add-task-day:hover {
  background-color: #323130;
  cursor: pointer;
}

//
.warn-deadline-repeat {
  margin: 8px 0;
}

// 提醒 warn
.add-task-warn {
  width: 326px;
  min-height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  color: #78bafd;
  background-color: #252423;
  .input {
    width: 326px;
    height: auto;
    overflow-wrap: anywhere;
    word-break: break-word; /* 兼容旧浏览器兜底 */
    white-space: pre-wrap; /* 保留用户输入的换行和空格 */
    outline: none;
    font-size: 16px;
    line-height: 1.8; /* 推荐：无单位，按字体大小倍数计算 */
    font-size: 16px;
    padding: 8px 0px;
  }
}
.add-task-warn:hover {
  background-color: #323130;
  cursor: pointer;
}
// 截止日期 deadline
.add-task-deadline {
  position: relative;
  width: 326px;
  min-height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  color: #78bafd;
  background-color: #252423;
  // border-top: solid 1px #484644;
  // border-bottom: solid 1px #484644; // --bg-separator
  .input {
    width: 326px;
    height: auto;
    overflow-wrap: anywhere;
    word-break: break-word; /* 兼容旧浏览器兜底 */
    white-space: pre-wrap; /* 保留用户输入的换行和空格 */
    outline: none;
    font-size: 16px;
    line-height: 1.8; /* 推荐：无单位，按字体大小倍数计算 */
    font-size: 16px;
    padding: 8px 0px;
  }
}

.add-task-deadline::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  height: 0.5px;
  width: 100%;
  background: #323130; // var(--bg-border);
}
.add-task-deadline::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 0.5px;
  width: 100%;
  background: #323130; // var(--bg-border); 605e5c
}
.add-task-deadline:hover {
  background-color: #323130;
  cursor: pointer;
}
// 重复 repeat
.add-task-repeat {
  width: 326px;
  min-height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  color: #78bafd;
  background-color: #252423;
  .input {
    width: 326px;
    height: auto;
    overflow-wrap: anywhere;
    word-break: break-word; /* 兼容旧浏览器兜底 */
    white-space: pre-wrap; /* 保留用户输入的换行和空格 */
    outline: none;
    font-size: 16px;
    line-height: 1.8; /* 推荐：无单位，按字体大小倍数计算 */
    font-size: 16px;
    padding: 8px 0px;
  }
}
.add-task-repeat:hover {
  background-color: #323130;
  cursor: pointer;
}
</style>

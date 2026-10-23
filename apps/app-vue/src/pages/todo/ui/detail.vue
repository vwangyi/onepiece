<script lang="ts" setup></script>

<template>
  <div class="detail">
    <div class="detail-main"></div>
    <div class="detail-footer">
      <div class="iconfont icon-tuichu"></div>
      <div class="create-time">创建于今天</div>
      <div class="iconfont icon-shanchu-1"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;

  .detail-main {
    // flex: 1;
    height: calc(100% - 58px);
    width: 100%;
  }
  .detail-footer {
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
}
</style>

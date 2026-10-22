<script lang="ts" setup></script>

<template>
  <div class="detail">
    <div class="detail-main"></div>
    <div class="detail-footer">
      <div class="iconfont"></div>
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
  background-color: blue;

  .detail-main {
    // flex: 1;
    height: calc(100% - 58px);
    width: 100%;
    background-color: aquamarine;
  }
  .detail-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-height: 58px;
    min-height: auto;
    background-color: red !important;
    color: #fff;
  }
}
</style>

<script setup lang="ts"></script>

<template>
  <div class="header">
    <div class="logo">To Do</div>

    <div class="search">
      <i class="iconfont icon-sousuo"></i>
      <input
        type="text"
        placeholder="搜索"
      />
    </div>
    <div class="header-btn-container">
      <div class="header-btn iconfont icon-shezhi"></div>
      <div class="header-btn iconfont icon-wenhao"></div>
      <div class="header-btn iconfont icon-tongzhi"></div>
      <div class="header-btn iconfont icon-touxiang"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 48px;
  background-color: #1b1a19;
}

.logo {
  width: 88px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}
.header-btn-container {
  display: flex;
  color: #fff;
}
.header-btn {
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  user-select: none;
  font-size: 20px;
}
.header-btn:hover {
  background-color: #323130;
}
.icon-touxiang {
  font-size: 34px;
}

.search {
  width: 400px;
  height: 32px;
  background-color: #323130;
  border-radius: 6px;
  text-align: left;
  color: #fff;
  padding: 8px;
  font-size: 16px;
  font-weight: 400;
}

.icon-sousuo {
  font-size: 16px;
}
</style>

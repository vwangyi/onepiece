<script setup lang="ts">
function handleSearchCancel() {
  console.log(11);
}
</script>

<template>
  <div class="header">
    <div class="logo">To Do</div>

    <div class="search">
      <div class="search-icon-container">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <input
        type="text"
        placeholder="前端就是画页面的 后端就是存数据库的"
      />
      <div
        class="search-cancel-container"
        @click="handleSearchCancel"
      >
        <i class="iconfont icon-quxiao"></i>
      </div>
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
$header-height: 48px;
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 48px;
  background-color: #1b1a19;
  border-bottom: solid 1px #484644; // --bg-separator
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
  cursor: pointer;
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
  font-size: 16px;
  font-weight: 400;
  display: flex;

  .search-icon-container {
    width: 30px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    margin-right: 6px;
    .icon-sousuo {
      width: 30px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      color: #78bafd;
      font-size: 20px;
    }
  }

  > input {
    flex: 1;
    font-weight: 400;
  }

  .search-cancel-container {
    width: 30px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    .icon-quxiao {
      width: 30px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      color: #78bafd;
      font-size: 12px;
    }
  }
}
</style>

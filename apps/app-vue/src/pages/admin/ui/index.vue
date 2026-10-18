<script setup lang="ts">
import NavBar from '@/widgets/navbar/index';
// import SideBar from './index';
// import AppMain from './index';
// import AppFooter from './index';
</script>

<template>
  <div>
    <div class="nav-bar">
      <NavBar comment="导航栏"></NavBar>
    </div>
    <div class="container">
      <div class="side-bar">
        <SideBar comment="侧边栏"></SideBar>
      </div>
      <div class="app-main">
        <AppMain comment="主内容区"></AppMain>
      </div>
    </div>
    <!-- <div class="app-footer">
      <AppFooter comment="页脚"></AppFooter>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
$nav-bar-width: 64px;
$side-bar-width: 220px;

.nav-bar {
  width: 100%;
  height: $nav-bar-width;
  outline: 1px solid red;
}
.container {
  display: flex;
}
.side-bar {
  width: $side-bar-width;
  height: calc(100vh - $nav-bar-width * 1);
  outline: 1px solid red;
}
.app-main {
  width: calc(100vw - $side-bar-width);
  height: calc(100vh - $nav-bar-width * 1);
  outline: 1px solid red;
}
.app-footer {
  width: 100vw;
  height: $nav-bar-width;
  outline: 1px solid red;
}
</style>

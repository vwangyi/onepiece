<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { getMicroApps } from './micro-apps';

const route = useRoute();
const microApps = getMicroApps();

const menuItems = [microApps.order, microApps.finance].filter(Boolean);

const currentApp = computed(() => {
  if (route.path.startsWith('/finance') && microApps.finance) {
    return microApps.finance;
  }
  return microApps.order;
});
</script>

<template>
  <div class="page-shell">
    <aside class="sidebar">
      <div class="menu-list">
        <button
          v-for="item in menuItems"
          :key="item.name"
          class="menu-button"
          :class="{ active: currentApp.name === item.name }"
          @click="() => $router.push(item.defaultPath)"
        >
          {{ item.label }}
        </button>
      </div>
    </aside>

    <main class="workspace">
      <RouterView />
    </main>
  </div>
</template>

<style>
.page-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}
</style>

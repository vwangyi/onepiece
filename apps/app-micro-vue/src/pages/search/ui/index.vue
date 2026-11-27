<script setup lang="ts">
import gSvg from './g-svg.svg';
import GoogleSvg from './google-svg.svg';
import { computed, reactive, ref, watch, onMounted } from 'vue';
import { setFavicon, setEmojiFavicon } from 'onepiece-utils';
import { useSearchStore } from '@/pages/search/model/search';

const searchStore = useSearchStore();

const keyword = ref('');

onMounted(() => {
  document.title = 'Google';
  console.log('google', gSvg);
  setFavicon(gSvg);
  searchStore.init();
});

function handleEnter() {
  console.log('handleEnter');
  searchStore.handleSearch(keyword.value);
}
</script>

<template>
  <div class="search">
    <div class="content">
      <div class="google-logo">
        <img
          :src="GoogleSvg"
          alt="google"
        />
      </div>
      <div class="google-search">
        <button @click="$router.push('/links')">添加常用链接</button>
        <a-input
          v-model:value="keyword"
          class="inp"
          @press-enter="handleEnter"
        ></a-input>
        <!-- <textarea class="text-area" :value=""></textarea> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 100vw;
  height: 100vh;
  background-color: #22242a; /* 暗色背景色 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  max-width: 700px;
  min-width: 272px;
  height: auto;
  // background-color: aquamarine;
}

.google-logo {
  width: 272px;
  height: 92px;
  margin: 20px auto;
}

.google-search {
  width: 688px;
  height: 50px;
  box-sizing: border-box;
  min-height: 50px;
  border: 1px solid #4d5156;
  box-shadow: none;
  border-radius: 26px;
  margin: 0 auto;
  background-color: #363840;
  /* 临时用这个来控制上下距离 */
  margin-bottom: 300px;

  > .text-area {
    width: 100%;
    min-height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
  }
  > .text-area:focus {
    outline: none;
    border: none;
  }
}
</style>

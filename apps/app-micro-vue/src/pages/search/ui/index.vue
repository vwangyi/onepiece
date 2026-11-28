<script setup lang="ts">
import gSvg from './g-svg.svg';
import GoogleSvg from './google-svg.svg';
import { computed, reactive, ref, watch, onMounted } from 'vue';
import { setFavicon, setEmojiFavicon } from 'onepiece-utils';
import { useSearchStore } from '@/pages/search/model/search';

const searchStore = useSearchStore();

onMounted(() => {
  document.title = 'Google';
  setFavicon(gSvg);
  searchStore.updateLinks();
});

function handleEnter() {
  searchStore.handleSearch(searchStore.keyword);
  searchStore.updateKeyword('');
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
        <div
          class="google-add"
          title="添加常用链接"
          @click="$router.push('/links')"
        >
          <div class="img iconfont icon-jiahao1"></div>
        </div>

        <input
          class="google-inp"
          type="text"
          :value="searchStore.keyword"
          @input="
            e => searchStore.updateKeyword((e.target as HTMLInputElement).value)
          "
          @keyup.enter="handleEnter"
        />
        <div class="google-enter">
          <div
            class="img iconfont icon-Machuichejian"
            :style="{ opacity: searchStore.keyword.length ? 1 : 0.4 }"
          ></div>
        </div>
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
}

.google-inp {
  flex: 1;
  height: 100%;
  font-size: 16px;
  color: #fff;
}

%btn-base {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-radius: 50%;
    font-size: 24px;
    color: white;
  }
}

.google-add {
  cursor: pointer;
  @extend %btn-base;
}
.google-enter {
  @extend %btn-base;
}
.google-add:hover .img {
  background-color: #4d5157 !important;
}
</style>

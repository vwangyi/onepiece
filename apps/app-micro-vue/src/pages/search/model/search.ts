import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as searchApi from '../api/search';

interface Links {
  key: number;
  title: string;
  link: string;
  keywords: string[];
}

export const searchStore = defineStore('search', () => {
  const links = ref<Links[]>([]);

  async function init() {
    // 调用后端api接口方法 都应该传泛型 并且泛型和返回值数据类型一致
    links.value = await searchApi.getSearch<Links[]>();
  }

  function handleSearch(keyword: string) {
    const query = keyword.trim();
    if (!query) return;
    const hit = links.value?.find(link => link.keywords.includes(query));
    if (hit) {
      window.open(hit.link, '_blank', 'noopener,noreferrer');
      return;
    }
    window.open(
      `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return {
    handleSearch,
  };
});

import { ref } from 'vue';
import { defineStore } from 'pinia';

/* theme 模块 */
export const useThemeStore = defineStore('theme', () => {
    const key = '__theme__';
    const theme = ref(localStorage.getItem(key)||'light');

    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        
        document.documentElement.dataset.theme = theme.value;
        localStorage.setItem(key, theme.value); // 同步到本地
    }
    return {
        theme,
        toggleTheme
    }
});

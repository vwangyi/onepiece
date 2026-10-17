import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from './types';

export const useUserStore = defineStore('entities/user', () => {
  // 1. 核心状态 (State)
  const currentUser = ref<User | null>(null);
  const isLoading = ref(false);

  // 2. 计算属性 (Getters)
  const isAuth = computed(() => currentUser.value !== null);
  const isAdmin = computed(
    () => currentUser.value?.roles.includes('admin') ?? false
  );

  // 3. 原子操作方法 (Actions)
  // 💡 注意：这里只写对状态的“直接修改”或“核心初始化逻辑”，不写复杂的业务流
  const setUser = (user: User) => {
    currentUser.value = user;
  };

  const clearUser = () => {
    currentUser.value = null;
  };

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  return {
    currentUser,
    isLoading,
    isAuth,
    isAdmin,
    setUser,
    clearUser,
    setLoading
  };
});

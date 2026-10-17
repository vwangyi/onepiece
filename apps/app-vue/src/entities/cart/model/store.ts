import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Cart, CartItem } from './types';

export const useCartEntityStore = defineStore('entities/cart', () => {
  // 1. 核心状态
  const items = ref<CartItem[]>([]);
  const totalAmount = ref(0);
  const updatedAt = ref<string>(new Date().toISOString());

  // 2. 计算属性
  const totalQuantity = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );
  const isEmpty = computed(() => items.value.length === 0);

  // 3. 原子操作
  const setCart = (cart: Cart) => {
    items.value = cart.items;
    totalAmount.value = cart.totalAmount;
    updatedAt.value = cart.updatedAt;
  };

  const clear = () => {
    items.value = [];
    totalAmount.value = 0;
    updatedAt.value = new Date().toISOString();
  };

  return {
    items,
    totalAmount,
    updatedAt,
    totalQuantity,
    isEmpty,
    setCart,
    clear
  };
});

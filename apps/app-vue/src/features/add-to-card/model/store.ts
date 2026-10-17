import { ref } from 'vue';
import { defineStore } from 'pinia';
import { addToCartRequest } from '../api/add-to-cart.api';
import type { AddToCartPayload } from './types';

// 💡 关键点：FSD 允许高层导入低层。这里导入底层的购物车实体 Store
import { useCartEntityStore } from '@/entities/cart';

export const useAddToCartStore = defineStore('features/add-to-cart', () => {
  const cartEntity = useCartEntityStore();

  // 仅属于该特性的交互状态
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 核心业务动作
  const execute = async (payload: AddToCartPayload) => {
    isLoading.value = true;
    error.value = null;

    try {
      // 1. 调用专属 API
      const updatedCartData = await addToCartRequest(payload);

      // 2. 成功后，同步更新底层实体的状态
      cartEntity.setCart(updatedCartData);

      // 3. 如果需要触发全局通知（比如全局的 toast 实体），也可以在这里调用
      // useNotificationEntity().showSuccess('已成功加入购物车');
    } catch (err) {
      error.value = err instanceof Error ? err.message : '添加失败';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    execute
  };
});

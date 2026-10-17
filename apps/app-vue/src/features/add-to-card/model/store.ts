import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AddToCartPayload } from './types';
// 💡 关键点：FSD 允许高层导入低层。这里导入底层的购物车实体 Store
// 必须走@/entities/cart 的公共 API，不能摸model/ 内部文件
import { addToCartRequest, useCartEntityStore } from '@/entities/cart';

export const useAddToCartStore = defineStore('features/add-to-card', () => {
  const cartEntity = useCartEntityStore();

  // 仅属于该特性的交互状态
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 核心业务动作
  const execute = async (payload: AddToCartPayload) => {
    isLoading.value = true;
    error.value = null;

    try {
      // 1. 调用实体层暴露的请求方法（拿到的已是 ApiResponse 包装）
      const response = await addToCartRequest(payload);

      // 2. 业务失败时 request 内部已弹提示，这里只需记录错误并中止
      if (!response.success || !response.data) {
        error.value = response.message || '添加失败';
        return;
      }

      // 3. 成功后，同步更新底层实体的状态（拆掉 ApiResponse 包装）
      cartEntity.setCart(response.data.cart);

      // 4. 如果需要触发全局通知（比如全局的 toast 实体），也可以在这里调用
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

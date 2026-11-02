<script setup lang="ts">
import { useAddToCartStore } from '../model/store';

const props = defineProps<{
  productId: string;
}>();

const addToCartStore = useAddToCartStore();

const handleAdd = () => {
  addToCartStore.execute({
    productId: props.productId,
    quantity: 1
  });
};
</script>

<template>
  <div class="add-to-cart-wrapper">
    <button
      :disabled="addToCartStore.isLoading"
      @click="handleAdd"
    >
      {{ addToCartStore.isLoading ? '加入中...' : '加入购物车' }}
    </button>

    <!-- 局部错误提示 -->
    <p
      v-if="addToCartStore.error"
      class="error-msg"
    >
      {{ addToCartStore.error }}
    </p>
  </div>
</template>

<style scoped>
.error-msg {
  color: red;
  font-size: 12px;
}
</style>

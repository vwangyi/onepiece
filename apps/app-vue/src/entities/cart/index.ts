// 广泛导出 Model，供上层消费
export { useCartEntityStore } from './model/store';
export type {
  Cart,
  CartItem,
  AddToCartPayload,
  AddToCartResult
} from './model/types';
export { addToCartRequest } from './api';

import { request } from '@/shared/utils';
import type { ApiResponse } from '@/shared/utils';
import type { AddToCartPayload, AddToCartResult } from '../model/types';

/**
 * 加入购物车
 * POST /cart/items  body: { productId, quantity }
 */
export function addToCartRequest(
  data: AddToCartPayload
): Promise<ApiResponse<AddToCartResult>> {
  return request.post('/api/cart/items', { data });
}

// 购物车实体类型
export interface CartItem {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  updatedAt: string;
}

// 加入购物车的入参
// 放在实体层而非 feature 层：实体的 api/ 不能反向依赖上层 feature
export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

// 加入购物车后的响应形态
export interface AddToCartResult {
  cart: Cart;
  message?: string;
}

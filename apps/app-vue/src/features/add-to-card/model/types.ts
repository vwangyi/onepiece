// features/add-to-card 相关的类型定义

// 入参类型由实体层定义并导出（实体不能反向依赖 feature），
// 这里只做转出，方便上层从 feature 公共 API 统一取。
export type { AddToCartPayload } from '@/entities/cart';

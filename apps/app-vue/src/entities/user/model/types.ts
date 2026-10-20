// entities/user/model/types.ts

export type UserRole = 'admin' | 'user' | 'guest';

/** 后端返回的原始结构（DTO） */
export interface UserDTO {
  id: number;
  email: string;
  name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

/** 前端领域模型 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | undefined;
  role: UserRole;
  createdAt: Date;
}

// entities/user/model/mapper.ts
import type { User, UserDTO, UserRole } from './types';

// 主要是 把 DTO数据传输对象 转换为 前端的领域模型 因为DTO和前端数据 不一定是一一对应
export function mapUserDTO(dto: UserDTO): User {
  return {
    id: String(dto.id),
    email: dto.email,
    name: dto.name,
    avatar: dto?.avatar_url ?? undefined,
    role: dto.role as UserRole,
    createdAt: new Date(dto.created_at)
  };
}

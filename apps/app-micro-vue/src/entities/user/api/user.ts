// import type { User } from '../model/types';

// const BASE = '/api';

// /**
//  * 获取用户
//  * @param id
//  * @returns
//  */
// export async function fetchUser(id: string): Promise<User> {
//   const res = await fetch(`${BASE}/users/${id}`);
//   if (!res.ok) throw new Error('Failed to fetch user');
//   return res.json();
// }

// /**
//  * 获取用户列表
//  * @returns
//  */
// export async function fetchUsers(): Promise<User[]> {
//   const res = await fetch(`${BASE}/users`);
//   if (!res.ok) throw new Error('Failed to fetch users');
//   return res.json();
// }

// entities/user/api/userApi.ts
import { request } from '@/shared/api';
import { mapUserDTO } from '../model/mapper';
import type { User, UserDTO } from '../model/types';

export async function getCurrentUser(): Promise<User> {
  const { data } = await request.get<UserDTO>('/users/me');
  return mapUserDTO(data);
}

export async function getUserById(id: string): Promise<User> {
  const { data } = await request.get<UserDTO>(`/users/${id}`);
  return mapUserDTO(data);
}

export async function updateUser(
  id: string,
  payload: { name: string; email: string }
): Promise<User> {
  const { data } = await request.patch<UserDTO>(`/users/${id}`, payload);
  return mapUserDTO(data);
}

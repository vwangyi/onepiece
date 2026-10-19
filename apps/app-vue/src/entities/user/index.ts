// 导出组件（如用户头像组件 UserAvatar，如果有的话）
// export { default as UserAvatar } from './ui/UserAvatar.vue';

// 广泛导出 Model，供上层消费
// 类型
// export type { User } from './model/types';

// // API
// export { fetchUser, fetchUsers } from './api/user';

// // 组合式函数
// export { useUser, useUsers } from './model/useUser';

// // UI
// export { UserCard } from './ui/UserCard';
// export { UserAvatar } from './ui/UserAvatar';

// entities/user/index.ts
export type { User, UserDTO, UserRole } from './model/types';
export { userProfileSchema, type UserProfileFormData } from './model/schema';

export { getCurrentUser, getUserById, updateUser } from './api/user';

export { default as UserCard } from './ui/UserCard.vue';
export { default as UserAvatar } from './ui/UserAvatar.vue';

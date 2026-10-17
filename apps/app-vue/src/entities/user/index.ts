// 导出组件（如用户头像组件 UserAvatar，如果有的话）
// export { default as UserAvatar } from './ui/UserAvatar.vue';

// 广泛导出 Model，供上层消费
export { useUserStore } from './model/store';
export type { User } from './model/types';

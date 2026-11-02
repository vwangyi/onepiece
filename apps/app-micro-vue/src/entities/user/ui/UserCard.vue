<script setup lang="ts">
// entities/user/ui/UserCard.vue

// UserCard 只负责“用户长什么样”的稳定部分：头像、姓名、角色徽章。
// 它不包含“编辑”“退出登录”等业务动作，这些由外层通过插槽或 props 注入。

import type { User } from '../model/types';

defineProps<{
  user: User;
  size?: 'sm' | 'md' | 'lg';
}>();
</script>

<template>
  <div
    class="user-card"
    :class="`user-card--${size ?? 'md'}`"
  >
    <img
      v-if="user.avatar"
      :src="user.avatar"
      :alt="user.name"
      class="user-card__avatar"
    />
    <div
      v-else
      class="user-card__avatar user-card__avatar--placeholder"
    >
      {{ user.name.slice(0, 1).toUpperCase() }}
    </div>

    <div class="user-card__info">
      <span class="user-card__name">{{ user.name }}</span>
      <span class="user-card__role">{{ user.role }}</span>
    </div>

    <!-- 业务动作由调用方通过插槽注入 -->
    <slot name="actions" />
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 10px;
}

.user-card--sm .user-card__avatar {
  width: 32px;
  height: 32px;
}
.user-card--md .user-card__avatar {
  width: 40px;
  height: 40px;
}
.user-card--lg .user-card__avatar {
  width: 56px;
  height: 56px;
}

.user-card__avatar {
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-card__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7eb;
  color: #4b5563;
  font-weight: 600;
}

.user-card__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.user-card__name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-card__role {
  font-size: 12px;
  color: #6b7280;
}
</style>

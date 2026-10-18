<!-- features/user-profile/ui/UserProfilePanel.vue -->
<!-- feature 层负责“对用户能做什么”。这里以“查看并编辑个人资料”为例：
 它从 @/entities/user 取 User 类型、useUser 和 UserCard，
 然后叠加上编辑表单、保存动作和提交状态。 -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  UserCard,
  useUser,
  updateUser,
  userProfileSchema,
  type UserProfileFormData
} from '@/entities/user';

const { user, loading, error, reload } = useUser();

const editing = ref(false);
const form = ref<UserProfileFormData>({ name: '', email: '' });
const saving = ref(false);
const formError = ref('');

// 当 user 加载完成或刷新时，同步表单初始值
watch(
  user,
  u => {
    if (u) form.value = { name: u.name, email: u.email };
  },
  { immediate: true }
);

async function handleSave() {
  if (!user.value) return;

  const parsed = userProfileSchema.safeParse(form.value);
  if (!parsed.success) {
    formError.value = parsed.error.issues[0]?.message ?? 'Validation failed';
    return;
  }

  saving.value = true;
  formError.value = '';
  try {
    await updateUser(user.value.id, parsed.data);
    await reload();
    editing.value = false;
  } catch {
    formError.value = '保存失败，请重试';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <section>
    <p v-if="loading">加载中…</p>
    <p v-else-if="error">{{ error.message }}</p>

    <template v-else-if="user">
      <!-- 复用 entities 的 UserCard，业务动作通过插槽注入 -->
      <UserCard
        :user="user"
        size="lg"
      >
        <template #actions>
          <button @click="editing = !editing">
            {{ editing ? '取消' : '编辑资料' }}
          </button>
        </template>
      </UserCard>

      <!-- 以下表单属于 feature 的业务逻辑，不放进 entities -->
      <form
        v-if="editing"
        @submit.prevent="handleSave"
      >
        <label>
          姓名
          <input v-model="form.name" />
        </label>
        <label>
          邮箱
          <input
            v-model="form.email"
            type="email"
          />
        </label>
        <p
          v-if="formError"
          style="color: red"
        >
          {{ formError }}
        </p>
        <button
          type="submit"
          :disabled="saving"
        >
          {{ saving ? '保存中…' : '保存' }}
        </button>
      </form>
    </template>
  </section>
</template>

// entities/user/model/schema.ts
import { z } from 'zod';

export const userProfileSchema = z.object({
  name: z.string().min(2, 'name至少需要2个字符'),
  email: z.string().email('无效的电子邮件地址')
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;

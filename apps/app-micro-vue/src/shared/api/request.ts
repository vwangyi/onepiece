// 统一复用 shared/utils 中创建的 axios 实例，
// 业务 API 层通过本文件以命名导出的方式使用 request
export { request } from '@/shared/utils';

export type { ApiResponse } from '@/shared/utils';

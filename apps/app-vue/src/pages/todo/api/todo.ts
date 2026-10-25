import { request } from 'onepiece-api';
import type { ResponseData } from 'onepiece-api';
import type { TaskDTO } from '../model/types';

export function findAll(params?: {
  page?: number | undefined;
  pageSize?: number | undefined;
  title?: string | undefined;
  status?: number | undefined;
}): Promise<ResponseData<TaskDTO[]>> {
  return request.get('/api/todo', { params: params });
}

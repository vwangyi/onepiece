import { request } from 'onepiece-api';
import type { ResponseData } from 'onepiece-api';
import type { TaskDTO } from '../model/types';

export function create() {
  // return request.get('/api/todo', { data });
}

export function remove(id: number) {}

export function update(id: number) {}

export function findOne(id: number) {}

export function findAll(query?: {
  page?: number | undefined;
  pageSize?: number | undefined;
  title?: string | undefined;
  status?: number | undefined;
}): Promise<ResponseData<TaskDTO[]>> {
  return request.get('/api/todo', { params: query });
}

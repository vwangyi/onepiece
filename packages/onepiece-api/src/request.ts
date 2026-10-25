import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from 'axios';

export interface ResponseData<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function request<T>(
  config: AxiosRequestConfig
): Promise<ResponseData<T>> {
  const res: AxiosResponse = await axios.request<AxiosRequestConfig>(config);

  const data: ResponseData<T> = res.data;

  if (data.success !== true) {
    console.error(data.message || '业务失败');
  }
  return data;
}

request.get = function <T>(
  url: string,
  config: AxiosRequestConfig
): Promise<ResponseData<T>> {
  return request<T>({ url, method: 'GET', ...config });
};

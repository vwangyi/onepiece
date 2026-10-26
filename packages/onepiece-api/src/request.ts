import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from 'axios';

export interface ResponseData<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export async function request<T>(
  config: AxiosRequestConfig
): Promise<ResponseData<T>> {
  try {
    const res: AxiosResponse = await axios.request<AxiosRequestConfig>(config);
    const data: ResponseData<T> = res.data;
    if (data.success !== true) {
      console.error(data.message || '业务失败');
    }
    return data;
  } catch (err) {
    const result: ResponseData<T> = {
      success: false,
      message: 'msg',
      data: null
    };
    return Promise.resolve(result);
  }
}

request.get = function <T>(
  url: string,
  config: AxiosRequestConfig
): Promise<ResponseData<T>> {
  return request<T>({ url, method: 'GET', ...config });
};

request.post = function <T>(
  url: string,
  config: AxiosRequestConfig
): Promise<ResponseData<T>> {
  return request<T>({ url, method: 'POST', ...config });
};

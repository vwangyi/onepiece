import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from 'axios';

/** 后端统一响应包装 */
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

/** 创建共享的 axios 实例，业务代码统一通过 request 发请求 */
export const request: AxiosInstance = axios.create({
  baseURL: import.meta.env?.VITE_BASE_URL ?? '/',
  timeout: 10_000,
});

// 请求拦截器：可在此统一附加 token 等
request.interceptors.request.use(config => {
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 响应拦截器：统一错误处理
request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('[request]', error.message);
    return Promise.reject(error);
  },
);

export default request;

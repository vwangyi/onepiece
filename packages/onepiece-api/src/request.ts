import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from 'axios';

// await request.get('/api/xx', {})
export async function request(config: AxiosRequestConfig) {
  const res: AxiosResponse = await axios.request<AxiosRequestConfig>(config);
}

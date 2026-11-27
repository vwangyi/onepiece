import { links } from './data';
import type { ResponseData } from 'onepiece-api';
export async function getSearch<T>(): Promise<T> {
  return await new Promise(resolve => {
    resolve(links as T);
  });
}

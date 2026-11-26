import { links } from './data';
export async function getSearch<T>(): Promise<T> {
  return await new Promise(resolve => {
    resolve(links as T);
  });
}

import { links } from './data';
import { Links } from '../model/search';
export async function getSearch(): Promise<Links[]> {
  return await new Promise((resolve, reject) => {
    resolve(links);
  });
}

import type { Song } from '../../../entities/product/@x/user';

export interface Artist {
  name: string;
  songs: Array<Song>;
}

// 这是官网标准的实体

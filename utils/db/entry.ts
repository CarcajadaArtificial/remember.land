import { dbItem } from 'types';

export interface iEntry {
  created_at: Date;
  content: string;
  tags: string[];
  entry_mark: string;
  // north_ids: number[];
  // south_ids: number[];
  // west_ids: number[];
  // east_ids: number[];
}

export type dbEntry = dbItem<iEntry, string>;

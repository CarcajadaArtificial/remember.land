import { dbItem, docItem } from 'types';

export interface iEntry {
  utc_created_at: string;
  content: string;
  tags: string[];
  entry_mark: string;
  // day_count: number;
  // north_ids: number[];
  // south_ids: number[];
  // west_ids: number[];
  // east_ids: number[];
}

export type dbEntry = dbItem<iEntry, string>;

export type docEntry = docItem<iEntry>;

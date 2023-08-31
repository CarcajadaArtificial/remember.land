import { LargeKvObject } from 'kvdex';
import { dbItem, docItem } from 'types';
import { db } from './index.ts';

export interface iEntry {
  utc_created_at: string;
  content: string;
  tags: string[];
  entry_mark: string;
  day_count: number;
  // north_ids: number[];
  // south_ids: number[];
  // west_ids: number[];
  // east_ids: number[];
}

export type dbEntry = dbItem<iEntry, string>;

export type docEntry = docItem<iEntry>;

export interface iQueryEntries {
  contains_text?: string;
  created_on_day_count?: number;
  created_before_day_count?: number;
  created_after_day_count?: number;
  includes_tags?: string[];
  excludes_tags?: string[];
  // include_all_tags: boolean
}

export interface LargeKvEntry extends LargeKvObject {
  utc_created_at: string;
  content: string;
  tags: string[];
  entry_mark: string;
  day_count: number;
  // north_ids: number[];
  // south_ids: number[];
  // west_ids: number[];
  // east_ids: number[];
}

export const getAllEntries = async () => await db.entries.getMany();

export const getEntry = async (id: Deno.KvKeyPart) => await db.entries.find(id);

export const addEntry = async (entry: LargeKvEntry) => {
  return await db.entries.add(entry);
};
export const deleteEntry = async (id: Deno.KvKeyPart) => {
  await db.entries.delete(id);
};
export const updateEntry = async (id: Deno.KvKeyPart, entry: LargeKvEntry) =>
  await db.entries.update(id, entry);

export const findEntries = async (query: iQueryEntries) => {
  return await db.entries.getMany({
    filter: (doc) => {
      const {
        contains_text,
        created_on_day_count,
        created_before_day_count,
        created_after_day_count,
        includes_tags,
        excludes_tags,
      } = query;
      const { content, day_count, tags } = doc.value;
      if (contains_text && content.search(contains_text) === -1) {
        return false;
      } else if (created_on_day_count && day_count !== created_on_day_count) {
        return false;
      } else if (
        created_before_day_count && day_count >= created_before_day_count
      ) {
        return false;
      } else if (
        created_after_day_count && day_count <= created_after_day_count
      ) {
        return false;
      } else if (
        includes_tags &&
        includes_tags.some((included_tag) => !tags.includes(included_tag))
      ) {
        return false;
      } else if (
        excludes_tags &&
        excludes_tags.some((included_tag) => tags.includes(included_tag))
      ) {
        return false;
      } else {
        return true;
      }
    },
  });
};

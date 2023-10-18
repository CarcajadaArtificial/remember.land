import { Document, LargeKvObject } from 'kvdex';
import { db } from './index.ts';

export interface iEntry {
  utc_created_at: string;
  content: string;
  tags: string[];
  entry_mark: string;
  day_count: number;
}

export interface iQueryEntries {
  contains_text?: string;
  created_on_day_count?: number;
  created_before_day_count?: number;
  created_after_day_count?: number;
  includes_tags?: string[];
  excludes_tags?: string[];
  // include_all_tags: boolean
}

export const SortEntriesBy = {
  content_alphabetically: (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
    asc
      ? a.value.content.localeCompare(b.value.content)
      : a.value.content.localeCompare(b.value.content) * -1,

  content_byLength: (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
    asc
      ? a.value.content.length - b.value.content.length
      : b.value.content.length - a.value.content.length,

  entryMark_alphabetically:
    (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
      asc
        ? a.value.entry_mark.localeCompare(b.value.entry_mark)
        : a.value.entry_mark.localeCompare(b.value.entry_mark) * -1,

  entry_mark_byLength: (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
    asc
      ? a.value.entry_mark.length - b.value.entry_mark.length
      : b.value.entry_mark.length - a.value.entry_mark.length,

  day_count: (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
    asc
      ? a.value.day_count - b.value.day_count
      : b.value.day_count - a.value.day_count,
};

export type LargeKvEntry = iEntry & LargeKvObject;

export type dbEntry = Document<LargeKvEntry>;

export const getAllEntries = async () => await db.entries.getMany();

export const getEntry = async (id: Deno.KvKeyPart) => await db.entries.find(id);

export const addEntry = async (entry: LargeKvEntry) => {
  // Replaces the entry's tags names to ids.
  entry.tags = await Promise.all(
    entry.tags.map(async (tag) =>
      (await db.tags.getMany({ filter: (doc) => doc.value.name === tag }))
        .result[0].id.toString()
    ),
  );

  return await db.entries.add(entry);
};

export const deleteEntry = async (id: Deno.KvKeyPart) => {
  await db.entries.delete(id);
};

export const updateEntry = async (id: Deno.KvKeyPart, entry: LargeKvEntry) =>
  await db.entries.update(id, entry);

export const findEntries = async (query: iQueryEntries) => {
  return (await db.entries.getMany({
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
  })).result.sort();
};

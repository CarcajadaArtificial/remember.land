import { dbItem, docItem } from 'types';
import { DbResults } from 'tilia/src/types.ts';
import { Collection } from 'tilia/mod.ts';

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

const entries = new Collection<docEntry>({
  filename: './data/db/entries.json.db',
  autoload: true,
});

export const insertEntry = async (
  entry: iEntry,
): Promise<DbResults<docEntry>> =>
  await entries.insert({
    utc_created_at: entry.utc_created_at,
    content: entry.content,
    tags: entry.tags,
    entry_mark: entry.entry_mark,
    day_count: entry.day_count,
  });

export const deleteEntry = async (id: string): Promise<DbResults<docEntry>> =>
  await entries.removeOne({ _id: id });

export const updateEntry = async (
  id: string,
  entry: iEntry,
): Promise<DbResults<docEntry>> =>
  await entries.updateOne(
    { _id: id },
    { $set: { ...entry } },
  );

export const getAllEntries = async (): Promise<docEntry[]> => {
  const allEntries = await entries.find({});
  return Array.isArray(allEntries)
    ? allEntries as docEntry[]
    : [allEntries] as docEntry[];
};

export const findEntries = async (
  query: iQueryEntries,
): Promise<DbResults<docEntry>> => {
  const {
    contains_text,
    created_on_day_count,
    created_before_day_count,
    created_after_day_count,
    includes_tags,
    excludes_tags,
  } = query;

  const allEntries = await getAllEntries();

  return allEntries.filter((entry) => {
    const { content, day_count, tags } = entry;
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
  });
};

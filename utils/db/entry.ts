import { dbItem, docItem } from 'types';
import { DbResults, Projection } from 'tilia/src/types.ts';
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

// export interface iQueryEntries {
//   contains_text: string;
//   created_before: Date;
//   created_after: Date;
//   includes_tags: string[];
//   excludes_tags: string[];
//   // include_all_tags: boolean
// }

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

export const findEntries = async (
  query: Partial<docEntry> = {},
  projection: Partial<Projection<keyof docEntry>> = {},
): Promise<DbResults<docEntry>> => await entries.find(query, projection);

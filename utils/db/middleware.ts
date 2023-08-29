import { docEntry, iEntry } from 'db/entry.ts';
import { Collection } from 'tilia/mod.ts';
import { DbResults, Projection } from 'tilia/src/types.ts';

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
  });

export const deleteEntry = async (id: string): Promise<DbResults<docEntry>> =>
  await entries.removeOne({ _id: id });

export const updateEntry = async (id: string, entry: iEntry) => {
  await entries.updateOne(
    { _id: id },
    { $set: { ...entry } },
  );
};

// export interface iQueryEntries {
//   contains_text: string;
//   created_before: Date;
//   created_after: Date;
//   includes_tags: string[];
//   excludes_tags: string[];
//   // include_all_tags: boolean
// }

export const findEntries = async (
  query: Partial<docEntry> = {},
  projection: Partial<Projection<keyof docEntry>> = {},
): Promise<DbResults<docEntry>> => await entries.find(query, projection);

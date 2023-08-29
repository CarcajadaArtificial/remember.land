import { dbEntry } from 'db/entry.ts';

export const nextEntryId = (): string => String(localStorage.length);

export const getEntries = (): dbEntry[] => localStorageToArray<dbEntry>();

export const setEntry = (entry: dbEntry): void =>
  localStorage.setItem(
    String(entry.id),
    JSON.stringify({
      id: entry.id,
      created_at: entry.created_at,
      content: entry.content,
      tags: entry.tags,
      entry_mark: entry.entry_mark,
    }),
  );

export const deleteEntry = (id: string): void => localStorage.removeItem(id);

export interface iQueryEntries {
  contains_text: string;
  created_before: Date;
  created_after: Date;
  includes_tags: string[];
  excludes_tags: string[];
  // include_all_tags: boolean
}

export const findEntries = (query?: Partial<iQueryEntries>): dbEntry[] => {
  if (
    !query ||
    Object.values(query).every((querySetting) => querySetting === undefined)
  ) {
    return localStorageToArray<dbEntry>();
  }

  const {
    contains_text,
    // created_before,
    // created_after,
    // includes_tags,
    // excludes_tags,
  } = query;

  return localStorageToArray<dbEntry>().filter((entry) => {
    // Content query logic
    if (
      contains_text && contains_text !== '' &&
      entry.content.search(contains_text)
    ) {
      return true;
    }
    // if(query.created_before) {

    // }
    // if(query.created_after) {

    // }
    // if(query.created_after) {

    // }

    return false;
  });
};

function localStorageToArray<T>(): T[] {
  const result = [];
  for (let i = 1; i < localStorage.length; i++) {
    const storedItem = localStorage.getItem(String(i));
    if (storedItem !== null) {
      result.push(JSON.parse(storedItem) as T);
    }
  }
  return result;
}

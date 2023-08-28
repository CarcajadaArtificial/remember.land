import { iNote } from 'db/note.ts';

export const nextEntryId = (): number => localStorage.length;

export const getEntries = (): iNote[] => localStorageToArray<iNote>();

export const setEntry = (entry: iNote): void =>
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

export const deleteEntry = (id: number): void =>
  localStorage.removeItem(String(id));

export interface iQueryEntries {
  contains_text: string;
  created_before: Date;
  created_after: Date;
  includes_tags: string[];
  excludes_tags: string[];
  // include_all_tags: boolean
}

export const findEntries = (query?: Partial<iQueryEntries>): iNote[] => {
  if (
    !query ||
    Object.values(query).every((querySetting) => querySetting === undefined)
  ) {
    return localStorageToArray<iNote>();
  }

  const {
    contains_text,
    // created_before,
    // created_after,
    // includes_tags,
    // excludes_tags,
  } = query;

  return localStorageToArray<iNote>().filter((note) => {
    // Content query logic
    if (
      contains_text && contains_text !== '' &&
      note.content.search(contains_text)
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

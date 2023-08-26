import { iNote } from 'db/note.ts';

export const nextEntryId = () => localStorage.length;

export const getEntries = () => localStorageToArray<iNote>();

export const setEntry = (entry: iNote) =>
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

function localStorageToArray<T>() {
  const result = [];
  for (let i = 1; i < localStorage.length; i++) {
    result.push(JSON.parse(localStorage.getItem(String(i))!) as T);
  }
  return result;
}

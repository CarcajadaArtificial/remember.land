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

export const deleteEntry = (id: number) => localStorage.removeItem(String(id));

function localStorageToArray<T>() {
  const result = [];
  for (let i = 1; i < localStorage.length; i++) {
    const storedItem = localStorage.getItem(String(i));
    if (storedItem !== null) {
      result.push(JSON.parse(storedItem) as T);
    }
  }
  return result;
}

import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { iNote } from 'db/note.ts';
import { Signal } from '@preact/signals';

function localStorageToArray<T>() {
  const result = [];
  for (let i = 1; i < localStorage.length; i++) {
    result.push(JSON.parse(localStorage.getItem(String(i))!) as T);
  }
  return result;
}

interface iEntryList {
  updateLocalStorage: Signal<number>;
}

export function EntryList(props: iEntryList) {
  const { updateLocalStorage } = props;
  const [entries, setEntries] = useState<iNote[]>([]);

  useEffect(() => {
    setEntries(localStorageToArray<iNote>());
  }, [updateLocalStorage.value]);

  return (
    <div class='grid'>
      {entries.map((entry) => (
        <Entry
          id={entry.id}
          created_at={entry.created_at}
          content={entry.content}
          tags={entry.tags}
          entry_mark={entry.entry_mark}
          updateLocalStorage={updateLocalStorage}
        />
      ))}
    </div>
  );
}

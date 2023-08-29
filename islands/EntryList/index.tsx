import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { iEntry } from 'db/note.ts';
import { getEntries } from 'db/middleware.ts';
import { Signal } from '@preact/signals';

interface iEntryList {
  updateEntriesSignal: Signal<number>;
}

export function EntryList(props: iEntryList) {
  const { updateEntriesSignal } = props;
  const [entries, setEntries] = useState<iEntry[]>([]);

  useEffect(() => {
    setEntries(getEntries());
  }, [updateEntriesSignal.value]);

  return (
    <div class='grid'>
      {entries.map((entry) => (
        <Entry
          id={entry.id}
          created_at={entry.created_at}
          content={entry.content}
          tags={entry.tags}
          entry_mark={entry.entry_mark}
          updateEntriesSignal={updateEntriesSignal}
        />
      ))}
    </div>
  );
}

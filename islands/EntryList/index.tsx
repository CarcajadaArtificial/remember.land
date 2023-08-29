import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { dbEntry } from 'db/entry.ts';
import { getEntries } from 'db/middleware.ts';
import { Signal } from '@preact/signals';

interface iEntryList {
  updateEntriesSignal: Signal<number>;
}

export function EntryList(props: iEntryList) {
  const { updateEntriesSignal } = props;
  const [entries, setEntries] = useState<dbEntry[]>([]);

  useEffect(() => {
    setEntries(getEntries());
  }, [updateEntriesSignal.value]);

  return (
    <div class='grid'>
      {entries.map((entry) => (
        <Entry entry={entry} updateEntriesSignal={updateEntriesSignal} />
      ))}
    </div>
  );
}

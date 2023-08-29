import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { dbEntry } from 'db/entry.ts';
// import { getEntries } from 'db/middleware.ts';
import { Signal } from '@preact/signals';

interface iEntryList {
  updateEntriesSignal: Signal<number>;
}

export function EntryList(props: iEntryList) {
  const { updateEntriesSignal } = props;
  const [entries, setEntries] = useState<dbEntry[]>([]);

  useEffect(() => {
    fetch('/api/entries/find', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({}),
    })
      .then(async (res) => {
        setEntries(await res.json());
      })
      .catch((e) => {
        alert('Find entries error.');
        console.error('Find entries error:', e);
      });
  }, [updateEntriesSignal.value]);

  return (
    <div class='grid'>
      {entries.map((entry) => (
        <Entry entry={entry} updateEntriesSignal={updateEntriesSignal} />
      ))}
    </div>
  );
}

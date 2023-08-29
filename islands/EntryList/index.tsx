import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { dbEntry } from 'db/entry.ts';
import { updateEntryList } from 'signals';

export function EntryList() {
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
  }, [updateEntryList.value]);

  return (
    <div class='grid'>
      {entries.map((entry) => <Entry entry={entry} />)}
    </div>
  );
}

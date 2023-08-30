import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { dbEntry } from 'db/entry.ts';
import { updateEntryList } from 'signals';
import { bring } from 'utils';

export function EntryList() {
  const [entries, setEntries] = useState<dbEntry[]>([]);

  useEffect(() => {
    // deno-lint-ignore ban-types
    bring<{}, dbEntry[]>('/api/entries/find', 'POST', {}, 'Find entries error.')
      .then((res) => {
        if (res) {
          setEntries(res);
        }
      });
  }, [updateEntryList.value]);

  return (
    <div class='grid'>
      {entries.map((entry) => <Entry entry={entry} />)}
    </div>
  );
}

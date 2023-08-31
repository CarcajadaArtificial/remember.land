import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { dbEntry, iQueryEntries } from 'db/entry.ts';
import { updateEntryList } from 'signals';
import { bring } from 'utils';
import { type findReq } from '../../routes/api/entries/find.tsx';

export interface iEntryList {
  query: iQueryEntries;
}

export function EntryList(props: iEntryList) {
  const [entries, setEntries] = useState<dbEntry[]>([]);

  useEffect(() => {
    bring<findReq, dbEntry[]>('/api/entries/find', 'POST', {
      query: props.query,
    }, 'Find entries error.')
      .then((res) => {
        if (res) {
          setEntries(res);
        }
      });
  }, [updateEntryList.value]);

  return (
    <div class='grid'>
      {entries.length === 0
        ? <></>
        : entries.map((entry) => <Entry entry={entry} />)}
    </div>
  );
}

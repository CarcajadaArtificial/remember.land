import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { dbEntry, docEntry } from 'db/entry.ts';
import { updateEntryList } from 'signals';
import { bring } from 'utils';
import { Projection } from 'tilia/src/types.ts';
import { type findReq } from '../../routes/api/entries/find.tsx';

export interface iEntryList {
  query: Partial<docEntry>;
  projection: Partial<Projection<keyof docEntry>>;
}

export function EntryList(props: iEntryList) {
  const [entries, setEntries] = useState<dbEntry[]>([]);

  useEffect(() => {
    bring<findReq, dbEntry[]>('/api/entries/find', 'POST', {
      query: props.query,
      projection: props.projection,
    }, 'Find entries error.')
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

import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { iQueryEntries, LargeKvEntry } from 'db/entry.ts';
import { updateEntryList } from 'signals';
import { bring } from 'utils';
import { type findReq } from 'api/entries/find.tsx';
import { Document } from 'kvdex';

export interface iEntryList {
  query: iQueryEntries;
}

export function EntryList(props: iEntryList) {
  const [entries, setEntries] = useState<Document<LargeKvEntry>[]>([]);

  useEffect(() => {
    bring<findReq, Document<LargeKvEntry>[]>('/api/entries/find', 'POST', {
      query: props.query,
    }, 'Find entries error.')
      .then((res) => {
        if (res) {
          setEntries(res);
        }
      });
  }, [updateEntryList.value]);

  return entries.length === 0 ? <></> : (
    <div class='grid'>
      {entries.map((entry) => <Entry entry={entry} />)}
    </div>
  );
}

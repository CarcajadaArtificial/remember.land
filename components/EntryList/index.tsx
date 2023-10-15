import { Document } from 'kvdex';
import { LargeKvEntry } from 'db/entry.ts';
import { EntryEdit } from 'islands/EntryEdit/index.tsx';

interface iEntryList {
  entries: Document<LargeKvEntry>[];
}

export function EntryList(props: iEntryList) {
  return (
    <div class='grid gap-1.5'>
      {props.entries.map((entry) => <EntryEdit entry={entry} />)}
    </div>
  );
}

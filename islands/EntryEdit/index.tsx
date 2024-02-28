import { Card } from 'lunchbox';
import type { iEntry } from '@/utils/dto.ts';
import Entry from '@/components/Entry/index.tsx';
import Handlers from '@/utils/handlers/EntryEdit.ts';
import EntryInput from '@/islands/EntryInput/index.tsx';
import { ENTRY_CONTAINER } from '@/utils/styles.ts';

export interface iEntryEdit {
  entry: iEntry;
  entryId: string;
}

export function EntryEdit(props: iEntryEdit) {
  const {
    onInputFocusOut,
    onEntryContainerKeyUp,
    editMode,
  } = Handlers(props);

  if (editMode) {
    return (
      <Card>
        <EntryInput
          onFocusOut={onInputFocusOut}
          {...props}
        />
      </Card>
    );
  }

  return (
    <div
      onKeyUp={onEntryContainerKeyUp}
      tabIndex={0}
      class={ENTRY_CONTAINER}
      data-utc_created_at={props.entry.createdAtUTC}
      data-day_count={props.entry.dayCount}
      data-id={props.entryId}
    >
      <Entry entry={props.entry} />
    </div>
  );
}

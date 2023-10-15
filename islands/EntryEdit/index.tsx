import { Card } from 'lunchbox';
import { dbEntry } from 'db/entry.ts';
import { Entry } from 'components/Entry/index.tsx';
import Handlers from 'handlers/EntryEdit.ts';
import { EntryInput } from 'islands/EntryInput/index.tsx';
import { ENTRY_CONTAINER } from 'styles';

export interface iEntryEdit {
  entry: dbEntry;
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
          entry={{ _id: props.entry.id.toString(), ...props.entry.value }}
        />
      </Card>
    );
  }

  return (
    <div
      onKeyUp={onEntryContainerKeyUp}
      tabIndex={0}
      class={ENTRY_CONTAINER}
      data-utc_created_at={props.entry.value.utc_created_at}
      data-day_count={props.entry.value.day_count}
      data-id={props.entry.id}
    >
      <Entry
        entry={props.entry}
      />
    </div>
  );
}

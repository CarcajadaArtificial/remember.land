import { Chiplist, Text } from 'lunchbox';
// import { format } from 'datetime';
import { iNote } from 'db/note.ts';
import { NoteTypeIndicator } from '../../components/NoteTypeIndicator/index.tsx';
import { InputNote } from '../InputNote/index.tsx';
import { useState } from 'preact/hooks';
import { Signal } from '@preact/signals';

interface iEntryComponent extends Partial<iNote> {
  updateLocalStorage: Signal<number>;
}

export function Entry(props: iEntryComponent) {
  const [editMode, setEditMode] = useState<boolean>(false);

  if (editMode) {
    return (
      <div class='clr-bg-panel-30'>
        <InputNote
          onFocusOut={() => {
            setEditMode(false);
          }}
          updateOnSubmit
          id={props.id}
          created_at={props.created_at}
          content={props.content}
          tags={props.tags}
          entry_mark={props.entry_mark}
          updateLocalStorage={props.updateLocalStorage}
        />
      </div>
    );
  }

  return (
    <div
      onClick={(_ev) => setEditMode(true)}
      onKeyUp={(ev) => {
        if (ev.key === 'Enter') {
          setEditMode(true);
        }
      }}
      tabIndex={0}
      class='isl-entry-container'
    >
      <div class='isl-entry-row'>
        <NoteTypeIndicator tags={props.tags} />
        <div>
          <Text noMargins>{props.content}</Text>
        </div>
      </div>
      {props.tags && props.tags.length > 0
        ? <Chiplist values={props.tags} />
        : null}
    </div>
  );
}

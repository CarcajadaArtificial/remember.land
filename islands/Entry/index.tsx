import { Chiplist, Link, Text } from 'lunchbox';
// import { format } from 'datetime';
import { iNote } from 'db/note.ts';
import { NoteTypeIndicator } from '../../components/NoteTypeIndicator/index.tsx';
import { InputNote } from '../InputNote/index.tsx';
import { useState } from 'preact/hooks';
import { Signal } from '@preact/signals';

interface iEntryComponent extends Partial<iNote> {
  updateEntriesSignal: Signal<number>;
}

export function Entry(props: iEntryComponent) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const isMarkUrl = props.entry_mark &&
    (props.entry_mark?.substring(0, 8) === 'https://' ||
      props.entry_mark?.substring(0, 7) === 'http://');

  if (editMode) {
    return (
      <div class='clr-bg-panel-30'>
        <InputNote
          onFocusOut={() => {
            setEditMode(false);
          }}
          id={props.id}
          created_at={props.created_at}
          content={props.content}
          tags={props.tags}
          entry_mark={props.entry_mark}
          updateEntriesSignal={props.updateEntriesSignal}
        />
      </div>
    );
  }

  return (
    <div
      onKeyUp={(ev) => {
        if (ev.shiftKey && ev.key === 'Enter') {
          setEditMode(true);
        } else if (isMarkUrl && ev.key === 'Enter') {
          window.open(props.entry_mark, '_blank');
        }
      }}
      tabIndex={0}
      class='isl-entry-container'
    >
      {props.entry_mark
        ? (
          <div className='isl-entry-hidden'>
            <Text noMargins class='ml-8' type='small'>{props.entry_mark}</Text>
          </div>
        )
        : null}
      <div class='isl-entry-row'>
        <NoteTypeIndicator tags={props.tags} />
        {isMarkUrl
          ? (
            <Link
              tabIndex={-1}
              target='_blank'
              nostyle
              class='isl-entry-link'
              href={props.entry_mark}
            >
              {props.content}
            </Link>
          )
          : (
            <div>
              <Text noMargins>{props.content}</Text>
            </div>
          )}
      </div>
      {props.tags && props.tags.length > 0
        ? (
          <div className='isl-entry-hidden'>
            <Chiplist class='ml-6' values={props.tags} />
          </div>
        )
        : null}
    </div>
  );
}

import { Chiplist, Link, Text } from 'lunchbox';
import { iEntry } from 'db/entry.ts';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import { EntryInput } from '../EntryInput/index.tsx';
import { useState } from 'preact/hooks';
import { Signal } from '@preact/signals';
import { deleteEntry } from 'db/middleware.ts';

interface iEntryComponent extends Partial<iEntry> {
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
        <EntryInput
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
        } else if (
          props.id && ev.key === 'Backspace' &&
          window.confirm('Are you sure you want to delete this entry?')
        ) {
          deleteEntry(props.id);
          props.updateEntriesSignal.value++;
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
        <EntryTypeIndicator tags={props.tags} />
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

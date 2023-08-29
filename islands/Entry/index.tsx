import { Chiplist, Link, Text } from 'lunchbox';
import { dbEntry } from 'db/entry.ts';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import { EntryInput } from '../EntryInput/index.tsx';
import { useState } from 'preact/hooks';
import { Signal } from '@preact/signals';
import { deleteEntry } from 'db/middleware.ts';
import { isURL } from 'utils';

interface iEntryComponent {
  entry: dbEntry;
  updateEntriesSignal: Signal<number>;
}

export function Entry(props: iEntryComponent) {
  const { entry, updateEntriesSignal } = props;
  const { id, content, tags, entry_mark } = entry;
  const [editMode, setEditMode] = useState<boolean>(false);
  const isMarkUrl = entry_mark && isURL(entry_mark);

  if (editMode) {
    return (
      <div class='clr-bg-panel-30'>
        <EntryInput
          onFocusOut={() => {
            setEditMode(false);
          }}
          entry={entry}
          updateEntriesSignal={updateEntriesSignal}
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
          window.open(entry_mark, '_blank');
        } else if (
          id && ev.key === 'Backspace' &&
          window.confirm('Are you sure you want to delete this entry?')
        ) {
          deleteEntry(id);
          updateEntriesSignal.value++;
        }
      }}
      tabIndex={0}
      class='isl-entry-container'
    >
      {entry_mark
        ? (
          <div className='isl-entry-hidden'>
            <Text noMargins class='ml-8' type='small'>{entry_mark}</Text>
          </div>
        )
        : null}
      <div class='isl-entry-row'>
        <EntryTypeIndicator tags={tags} />
        {isMarkUrl
          ? (
            <Link
              tabIndex={-1}
              target='_blank'
              nostyle
              class='isl-entry-link'
              href={entry_mark}
            >
              {content}
            </Link>
          )
          : (
            <div>
              <Text noMargins>{content}</Text>
            </div>
          )}
      </div>
      {tags && tags.length > 0
        ? (
          <div className='isl-entry-hidden'>
            <Chiplist class='ml-6' values={tags} />
          </div>
        )
        : null}
    </div>
  );
}

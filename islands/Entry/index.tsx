import { Chiplist, Link, Text } from 'lunchbox';
import { dbEntry } from 'db/entry.ts';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import { EntryInput } from '../EntryInput/index.tsx';
import Handlers from 'handlers/Entry.ts';

export interface iEntryComponent {
  entry: dbEntry;
}

export function Entry(props: iEntryComponent) {
  const { entry } = props;
  const { content, tags, entry_mark } = entry;

  const {
    onInputFocusOut,
    onEntryContainerKeyUp,
    editMode,
    isMarkUrl,
  } = Handlers(props);

  if (editMode) {
    return (
      <div class='clr-bg-panel-30'>
        <EntryInput
          onFocusOut={onInputFocusOut}
          entry={entry}
        />
      </div>
    );
  }

  return (
    <div
      onKeyUp={onEntryContainerKeyUp}
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

import { Document } from 'kvdex';
import { Chiplist, Link, Text } from 'lunchbox';
import { LargeKvEntry } from 'db/entry.ts';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import Handlers from 'handlers/Entry.ts';
import { EntryInput } from '../EntryInput/index.tsx';

export interface iEntryComponent {
  entry: Document<LargeKvEntry>;
}

export function Entry(props: iEntryComponent) {
  const { entry } = props;
  const { content, tags, entry_mark, utc_created_at, day_count } = entry.value;

  const {
    onInputFocusOut,
    onEntryContainerKeyUp,
    editMode,
    isMarkUrl,
  } = Handlers(props);

  const isTaskDone = tags.includes('task') && tags.includes('done');

  if (editMode) {
    return (
      <div class='clr-bg-panel-30'>
        <EntryInput
          onFocusOut={onInputFocusOut}
          entry={{
            _id: String(entry.id),
            content: content,
            entry_mark: entry_mark,
            tags: tags,
            utc_created_at: utc_created_at,
            day_count: day_count,
          }}
        />
      </div>
    );
  }

  return (
    <div
      onKeyUp={onEntryContainerKeyUp}
      tabIndex={0}
      class='isl-entry-container'
      data-utc_created_at={utc_created_at}
      data-day_count={day_count}
      data-id={entry.id}
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
              <Text class={isTaskDone ? 'line-through' : undefined} noMargins>
                {content}
              </Text>
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

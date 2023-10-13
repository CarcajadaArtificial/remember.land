import { Document } from 'kvdex';
import { Card, Chiplist, Link, Text } from 'lunchbox';
import { LargeKvEntry } from 'db/entry.ts';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import Handlers from 'handlers/Entry.ts';
import { EntryInput } from '../EntryInput/index.tsx';
import { ENTRY_CONTAINER, ENTRY_GRID } from 'styles';

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
      <Card>
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
      </Card>
    );
  }

  return (
    <div
      onKeyUp={onEntryContainerKeyUp}
      tabIndex={0}
      class={ENTRY_CONTAINER}
      data-utc_created_at={utc_created_at}
      data-day_count={day_count}
      data-id={entry.id}
    >
      {entry_mark && isMarkUrl
        ? (
          <div className='isl-entry-hidden'>
            <Link tabIndex={-1}>
              <Text
                noMargins
                class='ml-6'
                type='small'
                style={{ lineHeight: '1.1rem' }}
              >
                {entry_mark}
              </Text>
            </Link>
          </div>
        )
        : entry_mark && !isMarkUrl
        ? (
          <div className='isl-entry-hidden'>
            <Text
              noMargins
              class='ml-6'
              type='small'
              style={{ lineHeight: '1.1rem' }}
            >
              {entry_mark}
            </Text>
          </div>
        )
        : null}
      <div class={ENTRY_GRID}>
        <EntryTypeIndicator tags={tags} />
        <Text
          class={isTaskDone
            ? 'line-through'
            : isMarkUrl
            ? 'underline'
            : undefined}
          noMargins
        >
          {content}
        </Text>
      </div>
      {tags && tags.length > 0
        ? (
          <div className='isl-entry-hidden mt-1'>
            <Chiplist class='ml-6' values={tags} />
          </div>
        )
        : null}
    </div>
  );
}

import { Chiplist, Link, Text } from 'lunchbox';
import { cn } from 'lunchbox/utils.ts';
import EntryTypeIndicator from '@/components/EntryTypeIndicator/index.tsx';
import { ENTRY_GRID } from '@/utils/styles.ts';
import { iEntry } from '@/utils/dto.ts';
import { isURL } from '@/utils/utils.ts';

export interface iEntryComponent {
  entry: iEntry;
}

export default function Entry(props: iEntryComponent) {
  const { content, tagIds, mark } = props.entry;
  const isMarkUrl = mark !== '' && isURL(mark);
  const isTaskDone = tagIds.includes('task') && tagIds.includes('done');

  return (
    <>
      {mark && isMarkUrl
        ? (
          <div className='isl-entry-hidden'>
            <Link tabIndex={-1}>
              <Text
                noMargins
                class='ml-6'
                type='small'
                style={{ lineHeight: '1.1rem' }}
              >
                {mark}
              </Text>
            </Link>
          </div>
        )
        : mark && !isMarkUrl
        ? (
          <div className='isl-entry-hidden'>
            <Text
              noMargins
              class='ml-6'
              type='small'
              style={{ lineHeight: '1.1rem' }}
            >
              {mark}
            </Text>
          </div>
        )
        : null}
      <div class={ENTRY_GRID}>
        <EntryTypeIndicator tags={tagIds} />
        <Text
          class={cn(
            isTaskDone ? 'line-through' : isMarkUrl ? 'underline' : undefined,
            'pt-0.5',
          )}
          noMargins
        >
          {content}
        </Text>
      </div>
      {tagIds && tagIds.length > 0
        ? (
          <div className='isl-entry-hidden mt-1'>
            <Chiplist class='ml-6' values={tagIds} />
          </div>
        )
        : null}
    </>
  );
}

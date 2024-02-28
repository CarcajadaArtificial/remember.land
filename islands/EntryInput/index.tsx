import { Card } from 'lunchbox';
import IconTag from 'icons/tag.tsx';
import IconBookmark from 'icons/bookmark.tsx';
import { iEntry } from '@/utils/dto.ts';
import { iTag } from '@/utils/dto.ts';
import EntryTypeIndicator from '@/components/EntryTypeIndicator/index.tsx';
import EntryLengthIndicator from '@/components/EntryLengthIndicator/index.tsx';
import { ENTRY_GRID, ICON_STANDARD } from '@/utils/styles.ts';
import InputContent from './components/InputContent.tsx';
import InputMark from './components/InputMark.tsx';
import InputTags from './components/InputTags.tsx';
import { createEntryInputState } from '@/utils/hooks.ts';

export interface iEntryInput {
  entry: iEntry;
  userTags: iTag[];
  isLocal?: boolean;
}

export default function EntryInput(props: iEntryInput) {
  const state = createEntryInputState(
    props.userTags,
    props.entry,
  );

  // References
  const entryTags = state.userTags.filter((userTag) =>
    state.entry.tagIds.includes(userTag.id)
  );

  return (
    <Card>
      <div class='isl-EntryInput-container'>
        <div class={ENTRY_GRID}>
          <EntryTypeIndicator
            tags={entryTags.map((entryTag) => entryTag.name)}
          />
          <InputContent {...state} />
          <IconBookmark class={ICON_STANDARD} />
          <InputMark {...state} />
          <IconTag class={ICON_STANDARD} />
          <InputTags {...state} />
        </div>
      </div>
      <EntryLengthIndicator length={0} />
    </Card>
  );
}

import { Card, Chiplist, Text } from 'lunchbox';
import IconTag from 'icons/tag.tsx';
import IconBookmark from 'icons/bookmark.tsx';
import { iEntry } from '@/utils/db/entry.ts';
import { iQueryTags, iTag } from '@/utils/db/tag.ts';
import EntryTypeIndicator from '@/components/EntryTypeIndicator/index.tsx';
import EntryLengthIndicator from '@/components/EntryLengthIndicator/index.tsx';
import {
  ENTRY_GRID,
  ENTRY_INPUT_FIELD,
  ICON_STANDARD,
} from '@/utils/styles.ts';
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

  // return (
  //   <div>
  //     <div class='isl-EntryInput-container' onKeyDown={handleConatinerKeyDown}>
  //       <div class={ENTRY_GRID}>
  //         {/* Textarea Row */}
  //         <EntryTypeIndicator tags={tagIds} />
  //         <Text
  //           contentEditable
  //           onKeyUp={handleEntryInput}
  //           fref={refTextarea}
  //           class={`${ENTRY_INPUT_FIELD} px-1.5`}
  //           style={{ lineBreak: 'anywhere' }}
  //         >
  //           {props.entry.content}
  //         </Text>

  //         {/* Entry Mark Row */}
  //         <IconBookmark class={ICON_STANDARD} />
  //         <input
  //           class={`${ENTRY_INPUT_FIELD} px-1.5`}
  //           type='text'
  //           onKeyUp={handleEntryMarkInput}
  //           onFocus={handleFieldFocus('entrymark')}
  //           value={entryMark}
  //         />

  //         {/* Tags Row */}
  //         <IconTag class={ICON_STANDARD} />
  //         <input
  //           class={`${ENTRY_INPUT_FIELD} px-1.5`}
  //           type='text'
  //           onFocus={handleFieldFocus('tags')}
  //           onKeyUp={handleTagInput}
  //         />
  //       </div>
  //       {/* Tags Chiplist */}
  //       <Chiplist
  //         values={tagIds}
  //         onRemove={handleRemoveTag}
  //         class='ml-6 mt-1.5'
  //       />
  //     </div>
  //     <EntryLengthIndicator length={entryValue.length} />

  //   </div>
  // );
}

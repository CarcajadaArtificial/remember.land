import { useEffect, useRef } from 'preact/hooks';
import { Chiplist, Text } from 'lunchbox';
import IconTag from 'icons/tag.tsx';
import IconBookmark from 'icons/bookmark.tsx';
import Handlers from '@/utils/handlers/EntryInput.ts';
import { iEntry } from '@/utils/db/entry.ts';
import EntryTypeIndicator from '@/components/EntryTypeIndicator/index.tsx';
import EntryLengthIndicator from '@/components/EntryLengthIndicator/index.tsx';
import {
  ENTRY_GRID,
  ENTRY_INPUT_FIELD,
  ICON_STANDARD,
} from '@/utils/styles.ts';

export interface iEntryInput {
  entry: iEntry;
  entryId: string;
  onFocusOut: () => void;
}

export default function EntryInput(props: iEntryInput) {
  const refTextarea = useRef<HTMLSpanElement>(null);

  const {
    handleRemoveTag,
    handleEntryMarkInput,
    handleTagInput,
    handleEntryInput,
    handleFieldFocus,
    handleConatinerKeyDown,
    entryMark,
    tags,
    entryValue,
  } = Handlers(props);

  useEffect(() => {
    refTextarea.current?.focus();
    if (entryValue === '' && refTextarea.current) {
      refTextarea.current.innerHTML = '';
    }
  }, [entryValue]);

  return (
    <div>
      <div class='isl-EntryInput-container' onKeyDown={handleConatinerKeyDown}>
        <div class={ENTRY_GRID}>
          {/* Textarea Row */}
          <EntryTypeIndicator tags={tags} />
          <Text
            contentEditable
            onKeyUp={handleEntryInput}
            fref={refTextarea}
            class={`${ENTRY_INPUT_FIELD} px-1.5`}
            style={{ lineBreak: 'anywhere' }}
          >
            {props.entry.content}
          </Text>

          {/* Entry Mark Row */}
          <IconBookmark class={ICON_STANDARD} />
          <input
            class={`${ENTRY_INPUT_FIELD} px-1.5`}
            type='text'
            onKeyUp={handleEntryMarkInput}
            onFocus={handleFieldFocus('entrymark')}
            value={entryMark}
          />

          {/* Tags Row */}
          <IconTag class={ICON_STANDARD} />
          <input
            class={`${ENTRY_INPUT_FIELD} px-1.5`}
            type='text'
            onFocus={handleFieldFocus('tags')}
            onKeyUp={handleTagInput}
          />
        </div>
        {/* Tags Chiplist */}
        <Chiplist
          values={tags}
          onRemove={handleRemoveTag}
          class='ml-6 mt-1.5'
        />
      </div>
      <EntryLengthIndicator length={entryValue.length} />
    </div>
  );
}

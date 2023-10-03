import { Chiplist, Text } from 'lunchbox';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import { EntryLengthIndicator } from 'components/EntryLengthIndicator/index.tsx';
import IconTag from 'icons/tag.tsx';
import Bookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/EntryInput.ts';
import { dbEntry } from 'db/entry.ts';
import { useEffect, useRef } from 'preact/hooks';
import { ENTRY_GRID } from 'styles';

export interface iEntryInput {
  entry: dbEntry;
  onFocusOut: () => void;
}

export function EntryInput(props: iEntryInput) {
  const refTextarea = useRef<HTMLSpanElement>();

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
    inputStep,
  } = Handlers(props);

  useEffect(() => {
    refTextarea.current?.focus();
  }, []);

  return (
    <div>
      <div class='isl-EntryInput-container' onKeyDown={handleConatinerKeyDown}>
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        {/* Textarea Row */}
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        <div class={ENTRY_GRID}>
          <EntryTypeIndicator tags={tags} />
          <Text
            contentEditable
            onKeyUp={handleEntryInput}
            fref={refTextarea}
          />
        </div>
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        {/* Entry Mark Row */}
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        <div
          class={!(inputStep.includes('entrymark') || entryMark !== '')
            ? 'isl-EntryInput-row_hidden'
            : 'isl-EntryInput-row_hidden transition-appears-maxheight'}
        >
          <Bookmark class='w-5 pt-1.5' stroke={1} />
          <input
            type='text'
            class='comp-input isl-EntryInput-field'
            onKeyUp={handleEntryMarkInput}
            onFocus={handleFieldFocus('entrymark')}
            value={entryMark}
          />
        </div>
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        {/* Tags Row */}
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        <div
          class={!inputStep.includes('tags')
            ? 'isl-EntryInput-row_hidden'
            : 'isl-EntryInput-row_hidden transition-appears-maxheight'}
        >
          <IconTag class='w-5 pt-1.5' stroke={1} />
          <input
            type='text'
            class='comp-input isl-EntryInput-field'
            onFocus={handleFieldFocus('tags')}
            onKeyUp={handleTagInput}
          />
        </div>
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

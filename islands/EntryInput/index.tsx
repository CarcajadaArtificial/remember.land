import { Chiplist } from 'lunchbox';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import { EntryLengthIndicator } from 'components/EntryLengthIndicator/index.tsx';
import IconTag from 'icons/tag.tsx';
import Bookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/EntryInput.ts';
import { dbEntry } from 'db/entry.ts';
import { Ref, useEffect, useRef } from 'preact/hooks';

export interface iEntryInput {
  entry: dbEntry;
  onFocusOut: () => void;
}

export function EntryInput(props: iEntryInput) {
  const refTextarea = useRef<HTMLTextAreaElement>();

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
      <div
        class='isl-EntryInput-container'
        onKeyDown={handleConatinerKeyDown}
      >
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        {/* Textarea Row */}
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        <div class='isl-EntryInput-row'>
          <div class='pt-1'>
            <EntryTypeIndicator tags={tags} />
          </div>
          <textarea
            class='isl-EntryInput-textarea'
            rows={5}
            onKeyUp={handleEntryInput}
            value={entryValue}
            ref={refTextarea as Ref<HTMLTextAreaElement>}
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

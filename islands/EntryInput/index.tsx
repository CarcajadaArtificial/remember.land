import { Chiplist, Input, Text } from 'lunchbox';
import { transition } from 'lunchbox/styles.ts';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import { EntryLengthIndicator } from 'components/EntryLengthIndicator/index.tsx';
import IconTag from 'icons/tag.tsx';
import IconBookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/EntryInput.ts';
import { dbEntry } from 'db/entry.ts';
import { useEffect, useRef } from 'preact/hooks';
import { ENTRY_GRID, ICON_STANDARD } from 'styles';

export interface iEntryInput {
  entry: dbEntry;
  onFocusOut: () => void;
}

export function EntryInput(props: iEntryInput) {
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
            class='outline-none'
          />

          {/* Entry Mark Row */}
          <IconBookmark class={ICON_STANDARD} />
          <Input
            class='w-full'
            type='text'
            onKeyUp={handleEntryMarkInput}
            onFocus={handleFieldFocus('entrymark')}
            value={entryMark}
            fwd={{ container: { nostyle: true } }}
          />

          {/* Tags Row */}
          <IconTag class={ICON_STANDARD} />
          <Input
            class='w-full'
            type='text'
            onFocus={handleFieldFocus('tags')}
            onKeyUp={handleTagInput}
            fwd={{ container: { nostyle: true } }}
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

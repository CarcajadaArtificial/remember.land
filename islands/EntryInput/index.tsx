import { applyDefaults, Chiplist } from 'lunchbox';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import { EntryLengthIndicator } from 'components/EntryLengthIndicator/index.tsx';
import IconTag from 'icons/tag.tsx';
import Bookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/EntryInput.ts';
import { dbEntry } from 'db/entry.ts';
import { Signal } from '@preact/signals';
import { Ref, useEffect, useRef } from 'preact/hooks';
import { nextEntryId } from 'db/middleware.ts';

interface iEntryInput {
  entry: dbEntry;
  updateEntriesSignal?: Signal<number>;
  onFocusOut: () => void;
}

export function EntryInput(props: iEntryInput) {
  const { updateEntriesSignal, onFocusOut } = props;
  const refTextarea = useRef<HTMLTextAreaElement>();

  if (props.entry.id === '-1') {
    props.entry.id = nextEntryId();
  }

  const {
    handleRemoveTag,
    handleEntryMarkInput,
    handleTagInput,
    handleEntryInput,
    handleFieldFocus,
    handleCreateEntryShortcut,
    entryMark,
    tags,
    entryValue,
    inputStep,
  } = Handlers(props.entry);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const handleConatinerKeyDown = (ev: KeyboardEvent) => {
    if ((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter') {
      handleCreateEntryShortcut(ev);
      if (onFocusOut) {
        onFocusOut();
      }
      if (updateEntriesSignal) {
        updateEntriesSignal.value++;
      }
    }
    if (ev.key === 'Escape' && onFocusOut) {
      onFocusOut();
    }
  };

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

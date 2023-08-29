import { applyDefaults, Chiplist } from 'lunchbox';
import { EntryTypeIndicator } from 'components/EntryTypeIndicator/index.tsx';
import { EntryLengthIndicator } from 'components/EntryLengthIndicator/index.tsx';
import IconTag from 'icons/tag.tsx';
import Bookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/InputNote.ts';
import { def_Note, iEntry } from 'db/note.ts';
import { Signal } from '@preact/signals';
import { Ref, useEffect, useRef } from 'preact/hooks';
import { nextEntryId } from 'db/middleware.ts';

interface iInputNote extends Partial<iEntry> {
  updateEntriesSignal?: Signal<number>;
  onFocusOut?: () => void;
}

export function InputNote(props: iInputNote) {
  const { updateEntriesSignal, onFocusOut } = props;
  const p = applyDefaults<iEntry>(def_Note, props);
  const refTextarea = useRef<HTMLTextAreaElement>();

  if (p.id === -1) {
    p.id = nextEntryId();
  }

  const {
    handleRemoveTag,
    handleNoteMarkInput,
    handleTagInput,
    handleNoteInput,
    handleFieldFocus,
    handleCreateNoteShortcut,
    noteMark,
    tags,
    noteValue,
    inputStep,
  } = Handlers(p);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const handleConatinerKeyDown = (ev: KeyboardEvent) => {
    if ((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter') {
      handleCreateNoteShortcut(ev);
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
        class='isl-inputNote-container'
        onKeyDown={handleConatinerKeyDown}
      >
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        {/* Textarea Row */}
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        <div class='isl-inputNote-row'>
          <div class='pt-1'>
            <EntryTypeIndicator tags={tags} />
          </div>
          <textarea
            class='isl-inputNote-textarea'
            rows={5}
            onKeyUp={handleNoteInput}
            value={noteValue}
            ref={refTextarea as Ref<HTMLTextAreaElement>}
          />
        </div>
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        {/* NoteMark Row */}
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        <div
          class={!(inputStep.includes('notemark') || noteMark !== '')
            ? 'isl-inputNote-row_hidden'
            : 'isl-inputNote-row_hidden transition-appears-maxheight'}
        >
          <Bookmark class='w-5 pt-1.5' stroke={1} />
          <input
            type='text'
            class='comp-input isl-inputNote-field'
            onKeyUp={handleNoteMarkInput}
            onFocus={handleFieldFocus('notemark')}
            value={noteMark}
          />
        </div>
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        {/* Tags Row */}
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
        <div
          class={!inputStep.includes('tags')
            ? 'isl-inputNote-row_hidden'
            : 'isl-inputNote-row_hidden transition-appears-maxheight'}
        >
          <IconTag class='w-5 pt-1.5' stroke={1} />
          <input
            type='text'
            class='comp-input isl-inputNote-field'
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
      <EntryLengthIndicator length={noteValue.length} />
    </div>
  );
}

import { applyDefaults, Chiplist } from 'lunchbox';
import { NoteTypeIndicator } from 'components/NoteTypeIndicator/index.tsx';
import { NoteLengthIndicator } from 'components/NoteLengthIndicator/index.tsx';
import { InputNoteField } from 'components/InputNoteField/index.tsx';
import IconTag from 'icons/tag.tsx';
import Bookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/InputNote.ts';
import { def_Note, iNote } from 'db/note.ts';
import { Signal } from '@preact/signals';
import { Ref, useEffect, useRef } from 'preact/hooks';

interface iInputNote extends Partial<iNote> {
  updateLocalStorage?: Signal<number>;
  onFocusOut?: () => void;
  updateOnSubmit?: boolean;
}

export function InputNote(props: iInputNote) {
  const { updateLocalStorage, onFocusOut, updateOnSubmit } = props;
  const p = applyDefaults<iNote>(def_Note, props);
  const refTextarea = useRef<HTMLTextAreaElement>();

  if (!updateOnSubmit) {
    p.id = localStorage.length;
  }

  const {
    handleRemoveTag,
    handleTagInput,
    handleNoteInput,
    handleFieldFocus,
    handleCreateNoteShortcut,
    setNoteMark,
    noteMark,
    tags,
    noteValue,
    inputStep,
  } = Handlers(p);

  useEffect(() => {
    refTextarea.current?.focus();
  }, []);

  return (
    <div>
      <div
        onKeyDown={(ev) => {
          if ((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter') {
            handleCreateNoteShortcut(ev);
            if (onFocusOut) {
              onFocusOut();
            }
            if (updateLocalStorage) {
              updateLocalStorage.value++;
            }
          }
          if (ev.key === 'Escape' && onFocusOut) {
            onFocusOut();
          }
        }}
        class='isl-inputNote-container'
      >
        <div class='isl-inputNote-row'>
          <div class='pt-1'>
            <NoteTypeIndicator tags={tags} />
          </div>
          <textarea
            class='isl-inputNote-textarea'
            rows={5}
            onKeyUp={handleNoteInput}
            value={noteValue}
            ref={refTextarea as Ref<HTMLTextAreaElement>}
          />
        </div>
        <InputNoteField
          shown={inputStep.includes('notemark') || noteMark !== ''}
          onFocus={handleFieldFocus('notemark')}
          onKeyUp={(ev) => setNoteMark((ev.target as HTMLInputElement).value)}
          icon={<Bookmark class='w-5 pt-1.5' stroke={1} />}
          value={noteMark}
        />
        <InputNoteField
          shown={inputStep.includes('tags')}
          onFocus={handleFieldFocus('tags')}
          onKeyUp={handleTagInput}
          icon={<IconTag class='w-5 pt-1.5' stroke={1} />}
        />
        <div class='isl-inputNote-row mt-1.5'>
          <div />
          <Chiplist
            values={tags}
            onRemove={handleRemoveTag}
          />
        </div>
      </div>
      <NoteLengthIndicator length={noteValue.length} />
    </div>
  );
}

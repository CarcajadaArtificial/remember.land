import { applyDefaults, Button, Chiplist, Panel } from 'lunchbox';
import { NoteTypeIndicator } from 'components/NoteTypeIndicator/index.tsx';
import { NoteLengthIndicator } from 'components/NoteLengthIndicator/index.tsx';
import { InputNoteField } from 'components/InputNoteField/index.tsx';
import IconTag from 'icons/tag.tsx';
import Bookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/InputNote.ts';
import { def_Note, iNote } from 'db/note.ts';
import { Signal } from '@preact/signals';

interface iInputNote extends Partial<iNote> {
  updateLocalStorage: Signal<number>;
}

export function InputNote(props: iInputNote) {
  const { updateLocalStorage } = props;
  const p = applyDefaults<iNote>(def_Note, props);

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

  return (
    <Panel>
      <div
        onKeyDown={(ev) => {
          handleCreateNoteShortcut(ev);
          updateLocalStorage.value++;
        }}
        class='isl-inputNote-container'
      >
        <div class='isl-inputNote-row'>
          <NoteTypeIndicator tags={tags} />
          <textarea
            class='isl-inputNote-textarea'
            rows={5}
            onKeyUp={handleNoteInput}
            value={noteValue}
          />
        </div>
        <InputNoteField
          shown={inputStep.includes('notemark') || noteMark !== ''}
          onFocus={handleFieldFocus('notemark')}
          onKeyUp={(ev) => setNoteMark((ev.target as HTMLInputElement).value)}
          icon={<Bookmark class='w-5 pt-1.5' stroke={1} />}
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
    </Panel>
  );
}

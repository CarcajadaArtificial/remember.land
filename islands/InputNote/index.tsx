import { Chiplist, Panel } from 'lunchbox';
import { NoteTypeIndicator } from 'components/NoteTypeIndicator/index.tsx';
import { NoteLengthIndicator } from 'components/NoteLengthIndicator/index.tsx';
import IconTag from 'icons/tag.tsx';
import Handlers from 'handlers/InputNote.ts';

// import { iNote } from 'db/note.ts';
// export type iInputNote = Partial<iNote>;

export function InputNote(/* props: iInputNote */) {
  const { handleRemovetag, handleTagInput, handleNoteInput, tags, noteValue } =
    Handlers();

  return (
    <Panel>
      <div class='isl-inputNote-container'>
        <NoteTypeIndicator tags={tags} />
        <textarea
          class='isl-inputNote-textarea transition-focus-input-bg'
          rows={5}
          onKeyUp={handleNoteInput}
        />
        <IconTag class='w-5' stroke={1} />
        <input
          type='text'
          class='comp-input isl-inputNote-input transition-focus-input-bg'
        />
        <IconTag class='w-5' stroke={1} />
        <div>
          <input
            onKeyUp={handleTagInput}
            type='text'
            class='comp-input isl-inputNote-input transition-focus-input-bg'
          />
          <Chiplist
            values={tags}
            onRemove={handleRemovetag}
          />
        </div>
      </div>
      <NoteLengthIndicator length={noteValue.length} />
    </Panel>
  );
}

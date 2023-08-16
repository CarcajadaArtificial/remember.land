import { applyDefaults, Button, Chiplist, Panel } from 'lunchbox';
import { NoteTypeIndicator } from 'components/NoteTypeIndicator/index.tsx';
import { NoteLengthIndicator } from 'components/NoteLengthIndicator/index.tsx';
import { InputNoteField } from 'components/InputNoteField/index.tsx';
import IconTag from 'icons/tag.tsx';
import Bookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/InputNote.ts';
import { useState } from 'preact/hooks';
import { def_Note, iNote } from 'db/note.ts';

/**
 * @todo [!!] Add a cmd+enter / ctr+enter that executes `handleCreateNote()`.
 */
export function InputNote(props: Partial<iNote>) {
  const p = applyDefaults<iNote>(def_Note, props);

  const {
    handleRemoveTag,
    handleTagInput,
    handleNoteInput,
    handleCreateNote,
    setNoteMark,
    noteMark,
    tags,
    noteValue,
  } = Handlers(p);

  type Steps = 'notemark' | 'tags';

  const [
    inputStep,
    setInputStep,
  ] = useState<(Steps)[]>([]);

  const handleFieldFocus = (step: Steps) => (ev: Event) => {
    console.log('test');
    if (inputStep.includes(step)) {
      return;
    } else {
      setInputStep([...inputStep, step]);
    }
  };

  return (
    <Panel>
      <div class='isl-inputNote-container'>
        <div class='isl-inputNote-row'>
          <NoteTypeIndicator tags={tags} />
          <textarea
            class='isl-inputNote-textarea transition-focus-input-bg'
            rows={5}
            onKeyUp={handleNoteInput}
          />
        </div>
        <InputNoteField
          shown={inputStep.includes('notemark') || noteMark !== ''}
          onFocus={(ev: Event) => {
            console.log('notemark');
            if (inputStep.includes('notemark')) {
              return;
            } else {
              setInputStep([...inputStep, 'notemark']);
            }
          }}
          onKeyUp={(ev) => setNoteMark((ev.target as HTMLInputElement).value)}
          icon={<Bookmark class='w-5 pt-1.5' stroke={1} />}
        />
        <InputNoteField
          shown={inputStep.includes('tags')}
          onFocus={(ev: Event) => {
            console.log('tags');
            if (inputStep.includes('tags')) {
              return;
            } else {
              setInputStep([...inputStep, 'tags']);
            }
          }}
          onKeyUp={handleTagInput}
          icon={<IconTag class='w-5 pt-1.5' stroke={1} />}
        />
        <footer class='isl-inputNote-row'>
          <div />
          <Button
            onClick={handleCreateNote}
            type='panel'
          >
            Create Note
          </Button>
        </footer>
        <div class='isl-inputNote-row'>
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

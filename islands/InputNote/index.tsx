import { applyDefaults, Chiplist, Panel } from 'lunchbox';
import { NoteTypeIndicator } from 'components/NoteTypeIndicator/index.tsx';
import { NoteLengthIndicator } from 'components/NoteLengthIndicator/index.tsx';
import { InputNoteField } from 'components/InputNoteField/index.tsx';
import IconTag from 'icons/tag.tsx';
import Bookmark from 'icons/bookmark.tsx';
import Handlers from 'handlers/InputNote.ts';
import { useState } from 'preact/hooks';
import { def_Note, iNote } from 'db/note.ts';

export function InputNote(props: Partial<iNote>) {
  const p = applyDefaults<iNote>(def_Note, props);

  const { handleRemoveTag, handleTagInput, handleNoteInput, tags, noteValue } =
    Handlers(p);

  const [
    inputStep,
    setInputStep,
  ] = useState<undefined | 'notemark' | 'tags'>(undefined);

  const [noteMark, setNoteMark] = useState<string>('');

  // // The note that gets published.
  // const note: iNote = {
  //   id: 0,
  //   created_at: new Date(),
  //   content: noteValue,
  //   tags: tags,
  //   entry_mark: noteMark,
  // };

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
          shown={inputStep === 'notemark' || noteMark !== ''}
          onFocus={(ev) => setInputStep('notemark')}
          onKeyUp={(ev) => setNoteMark((ev.target as HTMLInputElement).value)}
          icon={<Bookmark class='w-5 pt-1.5' stroke={1} />}
        />
        <InputNoteField
          shown={inputStep === 'tags'}
          onFocus={(ev) => setInputStep('tags')}
          onKeyUp={handleTagInput}
          icon={<IconTag class='w-5 pt-1.5' stroke={1} />}
        />
        <div class='isl-inputNote-row'>
          <div></div>
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

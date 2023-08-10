import { useState } from 'preact/hooks';
import { Panel } from 'lunchbox';
import { NoteTypeIndicator } from 'components/NoteTypeIndicator/index.tsx';
import { iNote } from 'db/note.ts';
import { NoteTypes } from 'types';

export type iInputNote = Partial<iNote>;

export function InputNote(props: iInputNote) {
  const [type, setType] = useState<NoteTypes>('note');
  const [noteValue, setNoteValue] = useState<string>('');

  const charIndicatorProgress = `${(noteValue.length / 280) * 100}%`;
  const charIndicatorExcess = `${((noteValue.length - 280) / 280) * 100}%`;

  const automaticConversionSchema: { [key: string]: NoteTypes } = {
    ' * ': 'permanent',
    ' o ': 'event',
    ' - ': 'note',
    ' x ': 'task',
  };

  function handleNoteInput(ev: Event) {
    const value = (ev.target as HTMLTextAreaElement).value;

    if (
      value.at(0) === ' ' && value.length >= 3 &&
      Object.keys(automaticConversionSchema).includes(value.substring(0, 3))
    ) {
      const valueIndicatorRemoved = value.substring(3);
      (ev.target as HTMLTextAreaElement).value = valueIndicatorRemoved;
      setType(automaticConversionSchema[value.substring(0, 3)]);
      setNoteValue(valueIndicatorRemoved);
    } else {
      setNoteValue(value);
    }
  }

  return (
    <Panel>
      <div class='isl-inputNote-container'>
        <NoteTypeIndicator type={type} />
        <textarea
          class='isl-inputNote-textarea'
          rows={5}
          onKeyUp={handleNoteInput}
        />
      </div>
      <div class='isl-inputNote-characterIndicator'>
        <div
          style={{ width: charIndicatorProgress }}
          class='isl-inputNote-characterIndicator_progress'
        >
          <div
            style={{ width: charIndicatorExcess }}
            class='isl-inputNote-characterIndicator_excess'
          />
        </div>
      </div>
    </Panel>
  );
}

import { useState } from 'preact/hooks';
import { certainKeyPressed, Chiplist, Panel } from 'lunchbox';
import { NoteTypeIndicator } from 'components/NoteTypeIndicator/index.tsx';
import { iNote } from 'db/note.ts';
import { useTagList } from 'hooks';
import IconTag from 'icons/tag.tsx';

export type iInputNote = Partial<iNote>;

export function InputNote(props: iInputNote) {
  const [tags, updateTags] = useTagList();
  const [noteValue, setNoteValue] = useState<string>('');

  const charIndicatorProgress = `${(noteValue.length / 280) * 100}%`;
  const charIndicatorExcess = `${((noteValue.length - 280) / 280) * 100}%`;

  function handleNoteInput(ev: Event) {
    const value = (ev.target as HTMLTextAreaElement).value;

    if (
      value.at(0) === ' ' && value.length >= 3 &&
      [' - ', ' * ', ' x ', ' o '].includes(value.substring(0, 3))
    ) {
      const shortcut = value.substring(0, 3);
      switch (shortcut) {
        case ' - ':
          updateTags([], ['permanent', 'event', 'done', 'task']);
          break;
        case ' * ':
          updateTags(['permanent'], ['event', 'done', 'task']);
          break;
        case ' x ':
          if (tags.includes('done')) {
            updateTags([], ['permanent', 'event', 'done']);
          } else if (tags.includes('task')) {
            updateTags(['done'], ['permanent', 'event']);
          } else {
            updateTags(['task'], ['permanent', 'event']);
          }
          break;
        case ' o ':
          updateTags(['event'], ['permanent', 'task', 'done']);
          break;

        default:
          break;
      }

      const shortcutRemoved = value.substring(3);
      (ev.target as HTMLTextAreaElement).value = shortcutRemoved;
      setNoteValue(shortcutRemoved);
    } else {
      setNoteValue(value);
    }
  }

  return (
    <Panel>
      <div class='isl-inputNote-container'>
        <NoteTypeIndicator tags={tags} />
        <textarea
          class='isl-inputNote-textarea'
          rows={5}
          onKeyUp={handleNoteInput}
        />
        <IconTag class='w-5' stroke={1} />
        <div>
          <input
            onKeyUp={(ev) =>
              certainKeyPressed(ev, ['Enter', 'Spacebar', ' '], (ev) => {
                const newValue = (ev.target as HTMLInputElement).value;
                if (newValue.replace(' ', '').length > 0) {
                  updateTags([newValue], []);
                }
                (ev.target as HTMLInputElement).value = '';
              })}
            type='text'
            class='comp-input w-full mb-3'
          />
          <Chiplist
            values={tags}
            onRemove={(ev: Event) => {
              const target = ev.target as HTMLButtonElement;
              const chipValue =
                (target.previousSibling as HTMLElement).innerHTML;
              updateTags([], [chipValue]);
            }}
          />
        </div>
      </div>
      {/* @todo [!!] Turn this into a component. */}
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

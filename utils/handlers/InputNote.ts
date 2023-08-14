import { certainKeyPressed } from 'lunchbox';
import { useState } from 'preact/hooks';
import { useTagList } from 'hooks';

export default function () {
  const [tags, updateTags] = useTagList();
  const [noteValue, setNoteValue] = useState<string>('');

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

    if (value.includes('?')) {
      updateTags(['question'], []);
    } else if (tags.includes('question')) {
      updateTags([], ['question']);
    }
  }

  function handleTagInput(ev: Event) {
    return certainKeyPressed(ev, ['Enter', 'Spacebar', ' '], (ev) => {
      const newValue = (ev.target as HTMLInputElement).value;
      if (newValue.replace(' ', '').length > 0) {
        updateTags([newValue], []);
      }
      (ev.target as HTMLInputElement).value = '';
    });
  }

  function handleRemovetag(ev: Event) {
    const target = ev.target as HTMLButtonElement;
    const chipValue = (target.previousSibling as HTMLElement).innerHTML;
    updateTags([], [chipValue]);
  }

  return { handleNoteInput, handleTagInput, handleRemovetag, noteValue, tags };
}

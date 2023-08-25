import { certainKeyPressed } from 'lunchbox';
import { useState } from 'preact/hooks';
import { useTagList } from 'hooks';
import { iNote } from 'db/note.ts';

type Steps = 'notemark' | 'tags';

export default function (props: iNote) {
  const [tags, updateTags] = useTagList(props.tags);
  const [noteValue, setNoteValue] = useState<string>(props.content);
  const [noteMark, setNoteMark] = useState<string>(props.entry_mark);
  const [
    inputStep,
    setInputStep,
  ] = useState<(Steps)[]>([]);

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
    return certainKeyPressed(ev, ['Enter'], (ev) => {
      const newValue = (ev.target as HTMLInputElement).value;
      if (newValue.replace(' ', '').length > 0) {
        updateTags([newValue], []);
      }
      (ev.target as HTMLInputElement).value = '';
    });
  }

  function handleRemoveTag(ev: Event) {
    const target = ev.target as HTMLButtonElement;
    const chipValue = (target.previousSibling as HTMLElement).innerHTML;
    updateTags([], [chipValue]);
  }

  const handleFieldFocus = (step: Steps) => (_ev: Event) => {
    if (inputStep.includes(step)) {
      return;
    } else {
      setInputStep([...inputStep, step]);
    }
  };

  const handleCreateNoteShortcut = (ev: KeyboardEvent) => {
    if ((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter') {
      localStorage.setItem(
        String(localStorage.length),
        JSON.stringify({
          id: localStorage.length,
          created_at: new Date(),
          content: noteValue,
          tags: tags,
          entry_mark: noteMark,
        }),
      );
      setNoteValue('');
      setNoteMark('');
      updateTags([], tags);
      setInputStep([]);
    }
  };

  return {
    handleNoteInput,
    handleTagInput,
    handleRemoveTag,
    handleFieldFocus,
    handleCreateNoteShortcut,
    setNoteMark,
    noteMark,
    noteValue,
    tags,
    inputStep,
  };
}

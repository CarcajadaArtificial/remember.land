import { certainKeyPressed } from 'lunchbox';
import { useState } from 'preact/hooks';
import { useTagList } from 'hooks';
import { iEntry } from 'db/entry.ts';
import { setEntry } from 'db/middleware.ts';
import { isURL } from 'utils';

type Steps = 'entrymark' | 'tags';

export default function (props: iEntry) {
  const [tags, updateTags] = useTagList(props.tags);
  const [entryValue, setEntryValue] = useState<string>(props.content);
  const [entryMark, setEntryMark] = useState<string>(props.entry_mark);
  const [
    inputStep,
    setInputStep,
  ] = useState<(Steps)[]>([]);

  function handleEntryInput(ev: Event) {
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
      setEntryValue(shortcutRemoved);
    } else {
      setEntryValue(value);
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

  const handleCreateEntryShortcut = (_ev: KeyboardEvent) => {
    setEntry({
      id: props.id,
      created_at: props.created_at,
      content: entryValue,
      tags: tags,
      entry_mark: entryMark,
    });
    setEntryValue('');
    setEntryMark('');
    updateTags([], tags);
    setInputStep([]);
  };

  const handleEntryMarkInput = (ev: KeyboardEvent) => {
    const entry_mark = (ev.target as HTMLInputElement).value;
    const isMarkUrl = isURL(entry_mark);

    if (isMarkUrl && !tags.includes('link')) {
      updateTags(['link'], []);
    } else if (!isMarkUrl && tags.includes('link')) {
      updateTags([], ['link']);
    }

    setEntryMark(entry_mark);
  };

  return {
    handleEntryInput,
    handleTagInput,
    handleEntryMarkInput,
    handleRemoveTag,
    handleFieldFocus,
    handleCreateEntryShortcut,
    entryMark,
    entryValue,
    tags,
    inputStep,
  };
}

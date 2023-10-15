import { certainKeyPressed } from 'lunchbox/handlers.ts';
import { useState } from 'preact/hooks';
import { useTagList } from 'hooks';
import { bring, isURL } from 'utils';
import { iEntryInput } from 'islands/EntryInput/index.tsx';
import { updateEntryList } from 'signals';
import { iEntry } from 'db/entry.ts';

type Steps = 'entrymark' | 'tags';

export default function (props: iEntryInput) {
  const { entry, onFocusOut } = props;
  const [tags, updateTags] = useTagList(entry.tags);
  const [entryValue, setEntryValue] = useState<string>(entry.content);
  const [entryMark, setEntryMark] = useState<string>(entry.entry_mark);
  const [
    inputStep,
    setInputStep,
  ] = useState<(Steps)[]>([]);

  async function setEntry() {
    const setApiUrl = entry._id
      ? `/api/entries/${entry._id}/update`
      : '/api/entries/new';

    await bring<iEntry>(setApiUrl, 'POST', {
      utc_created_at: entry.utc_created_at,
      content: entryValue,
      tags: tags,
      entry_mark: entryMark,
      day_count: entry.day_count,
    }, 'Create entry error.');

    updateEntryList.value++;

    setEntryValue('');
    setEntryMark('');
    updateTags([], tags);
    setInputStep([]);
  }

  function handleEntryInput(ev: KeyboardEvent) {
    const value = (ev.target as HTMLSpanElement).innerText;

    if (
      ev.key === ' ' && value.length >= 2 &&
      ['-', '*', 'x', 'o'].includes(value[0])
    ) {
      switch (value[0]) {
        case '-':
          updateTags([], ['permanent', 'event', 'done', 'task']);
          break;
        case '*':
          updateTags(['permanent'], ['event', 'done', 'task']);
          break;
        case 'x':
          if (tags.includes('done')) {
            updateTags([], ['permanent', 'event', 'done']);
          } else if (tags.includes('task')) {
            updateTags(['done'], ['permanent', 'event']);
          } else {
            updateTags(['task'], ['permanent', 'event']);
          }
          break;
        case 'o':
          updateTags(['event'], ['permanent', 'task', 'done']);
          break;
        default:
          break;
      }
      const shortcutRemoved = value.substring(2);
      (ev.target as HTMLSpanElement).innerHTML = shortcutRemoved;
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

  function handleTagInput(ev: KeyboardEvent) {
    return certainKeyPressed(ev, ['Enter'], (ev) => {
      const newValue = (ev.target as HTMLInputElement).value;
      if (newValue.replace(/ /g, '').length > 0) {
        updateTags([newValue.replace(/ /g, '_')], []);
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

  function handleEntryMarkInput(ev: KeyboardEvent) {
    const entry_mark = (ev.target as HTMLInputElement).value;
    const isMarkUrl = isURL(entry_mark);

    if (isMarkUrl && !tags.includes('link')) {
      updateTags(['link'], []);
    } else if (!isMarkUrl && tags.includes('link')) {
      updateTags([], ['link']);
    }

    setEntryMark(entry_mark);
  }

  function handleConatinerKeyDown(ev: KeyboardEvent) {
    if ((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter') {
      setEntry();
      if (onFocusOut) {
        onFocusOut();
      }
    }
    if (ev.key === 'Escape' && onFocusOut) {
      onFocusOut();
    }
  }

  return {
    handleEntryInput,
    handleTagInput,
    handleEntryMarkInput,
    handleRemoveTag,
    handleFieldFocus,
    handleConatinerKeyDown,
    entryMark,
    entryValue,
    tags,
    inputStep,
  };
}

import { certainKeyPressed } from 'lunchbox/handlers.ts';
import { useState } from 'preact/hooks';
import { useTagList } from '@/utils/hooks.ts';
import { bring, isURL } from '@/utils/utils.ts';
import { iEntryInput } from '@/islands/EntryInput/index.tsx';
import { iEntry } from '@/utils/db/entry.ts';

type Steps = 'entrymark' | 'tags';

export default function (props: iEntryInput) {
  const { entry, entryId, onFocusOut } = props;
  const [tagIds, updateTagIds] = useTagList(entry.tagIds);
  const [entryMark, setEntryMark] = useState<string>(entry.mark);
  const [entryValue, setEntryValue] = useState<string>(entry.content);
  const [
    inputStep,
    setInputStep,
  ] = useState<(Steps)[]>([]);

  async function setEntry() {
    const setApiUrl = entryId
      ? `/api/entries/${entryId}/update`
      : '/api/entries/new';

    await bring<iEntry>(
      setApiUrl,
      'POST',
      {
        createdAtUTC: entry.createdAtUTC,
        content: entryValue,
        tagIds: tagIds,
        mark: entryMark,
        dayCount: entry.dayCount,
      },
      'Create entry error.',
    );

    setEntryValue('');
    setEntryMark('');
    updateTagIds([], tagIds);
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
          updateTagIds([], ['permanent', 'event', 'done', 'task']);
          break;
        case '*':
          updateTagIds(['permanent'], ['event', 'done', 'task']);
          break;
        case 'x':
          if (tagIds.includes('done')) {
            updateTagIds([], ['permanent', 'event', 'done']);
          } else if (tagIds.includes('task')) {
            updateTagIds(['done'], ['permanent', 'event']);
          } else {
            updateTagIds(['task'], ['permanent', 'event']);
          }
          break;
        case 'o':
          updateTagIds(['event'], ['permanent', 'task', 'done']);
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
      updateTagIds(['question'], []);
    } else if (tagIds.includes('question')) {
      updateTagIds([], ['question']);
    }
  }

  function handleTagInput(ev: KeyboardEvent) {
    return certainKeyPressed(ev, ['Enter'], (ev) => {
      const newValue = (ev.target as HTMLInputElement).value;
      if (newValue.replace(/ /g, '').length > 0) {
        updateTagIds([newValue.replace(/ /g, '_')], []);
      }
      (ev.target as HTMLInputElement).value = '';
    });
  }

  function handleRemoveTag(ev: Event) {
    const target = ev.target as HTMLButtonElement;
    const chipValue = (target.previousSibling as HTMLElement).innerHTML;
    updateTagIds([], [chipValue]);
  }

  const handleFieldFocus = (step: Steps) => (_ev: Event) => {
    if (inputStep.includes(step)) {
      return;
    } else {
      setInputStep([...inputStep, step]);
    }
  };

  function handleEntryMarkInput(ev: KeyboardEvent) {
    const mark = (ev.target as HTMLInputElement).value;
    const isMarkUrl = isURL(mark);

    if (isMarkUrl && !tagIds.includes('link')) {
      updateTagIds(['link'], []);
    } else if (!isMarkUrl && tagIds.includes('link')) {
      updateTagIds([], ['link']);
    }

    setEntryMark(mark);
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
    tagIds,
    inputStep,
  };
}

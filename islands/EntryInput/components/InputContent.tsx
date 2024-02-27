import { useEffect, useRef } from 'preact/hooks';
import { Text } from 'lunchbox';
import { ENTRY_INPUT_FIELD } from '@/utils/styles.ts';
import { EntryInputState } from '@/utils/hooks.ts';

export default function InputContent(props: EntryInputState) {
  const { entry, setEntry, updateEntryTags, userTags } = props;
  const refInputContent = useRef<HTMLSpanElement>(null);

  function handleInputContent(ev: KeyboardEvent) {
    const value = (ev.target as HTMLSpanElement).innerText;
    setEntry({ content: value });

    if (
      ev.key === ' ' && value.length >= 2 &&
      ['-', '*', 'x', 'o'].includes(value[0])
    ) {
      switch (value[0]) {
        case '-':
          // updateTagIds([], ['important', 'event', 'done', 'task']);
          break;
        case '*':
          // updateTagIds(['important'], ['event', 'done', 'task']);
          break;
        case 'x':
          // if (tagIds.includes('done')) {
          //   updateTagIds([], ['important', 'event', 'done']);
          // } else if (tagIds.includes('task')) {
          //   updateTagIds(['done'], ['important', 'event']);
          // } else {
          //   updateTagIds(['task'], ['important', 'event']);
          // }
          break;
        case 'o':
          // updateTagIds(['event'], ['important', 'task', 'done']);
          break;
        default:
          break;
      }
      const shortcutRemoved = value.substring(2);
      (ev.target as HTMLSpanElement).innerHTML = shortcutRemoved;
      // setEntryValue(shortcutRemoved);
    } else {
      // setEntryValue(value);
    }

    if (value.includes('?')) {
      // updateTagIds(['question'], []);
      // } else if (tagIds.includes('question')) {
      // updateTagIds([], ['question']);
    }
  }

  useEffect(() => {
    refInputContent.current?.focus();
    if (entry.content === '' && refInputContent.current) {
      refInputContent.current.innerHTML = '';
    }
  }, [entry.content]);

  return (
    <Text
      contentEditable
      fref={refInputContent}
      class={`${ENTRY_INPUT_FIELD} px-1.5`}
      style={{ lineBreak: 'anywhere' }}
      onkeydown={handleInputContent}
    >
      {entry.content}
    </Text>
  );
}

import { useEffect, useRef } from 'preact/hooks';
import { Text } from 'lunchbox';
import { ENTRY_INPUT_FIELD } from '@/utils/styles.ts';
import { EntryInputState } from '@/utils/hooks.ts';

export default function EntryInput(props: EntryInputState) {
  const { entry, setEntry, updateEntryTags, userTags } = props;
  // const standardTagIds = {
  //   permanent:
  //     userTags.filter((userTag) => userTag.value.name === 'permanent')[0].key,
  //   event: userTags.filter((userTag) => userTag.value.name === 'event')[0].key,
  //   done: userTags.filter((userTag) => userTag.value.name === 'done')[0].key,
  //   task: userTags.filter((userTag) => userTag.value.name === 'task')[0].key,
  //   question:
  //     userTags.filter((userTag) => userTag.value.name === 'question')[0].key,
  // };
  const refInputContent = useRef<HTMLSpanElement>(null);

  function handleEntryInput(ev: KeyboardEvent) {
    const value = (ev.target as HTMLSpanElement).innerText;
    setEntry({ content: value });

    if (
      ev.key === ' ' && value.length >= 2 &&
      ['-', '*', 'x', 'o'].includes(value[0])
    ) {
      switch (value[0]) {
        case '-':
          // updateTagIds([], ['permanent', 'event', 'done', 'task']);
          break;
        case '*':
          // updateTagIds(['permanent'], ['event', 'done', 'task']);
          break;
        case 'x':
          // if (tagIds.includes('done')) {
          //   updateTagIds([], ['permanent', 'event', 'done']);
          // } else if (tagIds.includes('task')) {
          //   updateTagIds(['done'], ['permanent', 'event']);
          // } else {
          //   updateTagIds(['task'], ['permanent', 'event']);
          // }
          break;
        case 'o':
          // updateTagIds(['event'], ['permanent', 'task', 'done']);
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
      onkeydown={handleEntryInput}
    >
      {entry.content}
    </Text>
  );
}

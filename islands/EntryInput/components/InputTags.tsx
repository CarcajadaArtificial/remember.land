import { Input } from 'lunchbox';
import { ENTRY_INPUT_FIELD } from '@/utils/styles.ts';
import { EntryInputState } from '@/utils/hooks.ts';

export default function InputTags(props: EntryInputState) {
  const { entry, setEntry, updateEntryTags, userTags } = props;

  function handleInputTags(ev: KeyboardEvent) {
    const value = (ev.target as HTMLInputElement).value;
    //   const isMarkUrl = isURL(value);
    //   if (isMarkUrl && !tagIds.includes('link')) {
    //     updateTagIds(['link'], []);
    //   } else if (!isMarkUrl && tagIds.includes('link')) {
    //     updateTagIds([], ['link']);
    //   }
  }

  return (
    <input
      class={`${ENTRY_INPUT_FIELD} px-1.5`}
      type='text'
      onKeyDown={handleInputTags}
    />
  );
}

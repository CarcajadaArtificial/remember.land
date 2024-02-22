import { useState } from 'preact/hooks';
import { bring, isURL } from '@/utils/utils.ts';
import { iEntryEdit } from '@/islands/EntryEdit/index.tsx';
import { updateEntryList } from '@/utils/signals.ts';

export default function (props: iEntryEdit) {
  const { entry, entryId } = props;
  const { mark } = entry;
  const [editMode, setEditMode] = useState<boolean>(false);
  const isMarkUrl: boolean = mark !== '' && isURL(mark);

  function onInputFocusOut() {
    setEditMode(false);
  }

  function onEntryContainerKeyUp(ev: KeyboardEvent) {
    if (ev.shiftKey && ev.key === 'Enter') {
      setEditMode(true);
    } else if (isMarkUrl && ev.key === 'Enter') {
      window.open(mark, '_blank');
    } else if (
      entryId && ev.key === 'Backspace' &&
      window.confirm('Are you sure you want to delete this entry?')
    ) {
      // deno-lint-ignore ban-types
      bring<{}, {}>(
        `/api/entries/${entryId}/delete`,
        'POST',
        {},
        'Delete entry error.',
      ).then(() => {
        updateEntryList.value++;
      });
    }
  }

  return {
    onInputFocusOut,
    onEntryContainerKeyUp,
    editMode,
  };
}

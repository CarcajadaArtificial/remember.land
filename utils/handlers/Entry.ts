import { useState } from 'preact/hooks';
import { bring, isURL } from 'utils';
import { iEntryComponent } from '../../islands/EntryEdit/index.tsx';
import { updateEntryList } from 'signals';

export default function (props: iEntryComponent) {
  const { entry } = props;
  const { entry_mark } = entry.value;
  const _id = entry.id;
  const [editMode, setEditMode] = useState<boolean>(false);
  const isMarkUrl: boolean = entry_mark !== '' && isURL(entry_mark);

  function onInputFocusOut() {
    setEditMode(false);
  }

  function onEntryContainerKeyUp(ev: KeyboardEvent) {
    if (ev.shiftKey && ev.key === 'Enter') {
      setEditMode(true);
    } else if (isMarkUrl && ev.key === 'Enter') {
      window.open(entry_mark, '_blank');
    } else if (
      _id && ev.key === 'Backspace' &&
      window.confirm('Are you sure you want to delete this entry?')
    ) {
      // deno-lint-ignore ban-types
      bring<{}, {}>(
        `/api/entries/${_id}/delete`,
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
    isMarkUrl,
  };
}

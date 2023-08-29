import { useState } from 'preact/hooks';
import { isURL } from 'utils';
import { iEntryComponent } from 'islands/Entry/index.tsx';
import { updateEntryList } from 'signals';

export default function (props: iEntryComponent) {
  const { entry } = props;
  const { _id, entry_mark } = entry;
  const [editMode, setEditMode] = useState<boolean>(false);
  const isMarkUrl = entry_mark && isURL(entry_mark);

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
      fetch(`/api/entries/${_id}/delete`, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({}),
      })
        .then(() => {
          updateEntryList.value++;
        })
        .catch((e) => {
          alert('Delete entry error.');
          console.error('Delete entry error:', e);
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

import { useEffect, useState } from 'preact/hooks';
import { ulid } from 'ulid';
import { ENTRY_INPUT_FIELD } from '@/utils/styles.ts';
import { EntryInputState } from '@/utils/hooks.ts';
import { iTag } from '@/utils/dto.ts';
import { bring } from '@/utils/utils.ts';
import type { ReqNewTag, ResNewTag } from '@/routes/api/tags/new.ts';

/** @todo Write documentation. */
export default function InputTags(props: EntryInputState) {
  const { entry, setEntry, updateEntryTags, userTags } = props;
  const [tagAutocompleteArray, setTagAutocompleteArray] = useState<iTag[]>([]);
  const [newTagName, setNewTagName] = useState<string>('');

  useEffect(() => {
    if (newTagName.length > 0) {
      setTagAutocompleteArray(
        userTags.filter((userTag) => userTag.name.startsWith(newTagName)),
      );
    } else {
      setTagAutocompleteArray([]);
    }
  }, [newTagName]);

  /** @todo Write documentation. */
  function handleEnterKey() {
    setNewTagName('');
    const existingTag = userTags.filter((userTag) =>
      userTag.name === newTagName
    );
    const isExistingTag = existingTag.length === 1;
    if (isExistingTag) {
      updateEntryTags([existingTag[0].id], []);
    } else {
      bring<ReqNewTag, ResNewTag>(
        `/api/tags/new`,
        'POST',
        {
          tag: {
            id: ulid(),
            name: newTagName,
          },
        },
        'Create entry error.',
      ).then((data) => {
        if (data) {
          updateEntryTags([data.tag.id], []);
        }
      });
    }
  }

  /** @todo Write documentation. */
  function handleArrowKey(ev: KeyboardEvent) {
    console.log('Arrow key pressed', ev.key);
  }

  return (
    <>
      <input
        class={`${ENTRY_INPUT_FIELD} px-1.5`}
        type='text'
        onKeyUp={(ev: KeyboardEvent) => {
          if (ev.key === 'Enter') {
            handleEnterKey();
          } else if (['ArrowDown', 'ArrowUp', 'ArrowRight'].includes(ev.key)) {
            handleArrowKey(ev);
          } else {
            setNewTagName((ev.target as HTMLInputElement).value);
          }
        }}
        value={newTagName}
      />
      <div />
      <div>
        {tagAutocompleteArray.map((tagAutocompleteOption) => (
          <div>{tagAutocompleteOption.name}</div>
        ))}
      </div>
    </>
  );
}

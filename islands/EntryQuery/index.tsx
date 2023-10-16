import { Card, Chiplist, Layout, Main, Panel } from 'lunchbox';
import { certainKeyPressed } from 'lunchbox/handlers.ts';
import { useState } from 'preact/hooks';
import { updateEntryList } from 'signals';
import IconTag from 'icons/tag.tsx';
import IconAlignJustified from 'icons/align-justified.tsx';
import { useTagList } from 'hooks';
import { iApp } from 'db/index.ts';
import { ENTRY_GRID, ENTRY_INPUT_FIELD } from 'styles';

interface iEntryQuery {
  appConfiguration: iApp;
}

export function EntryQuery(props: iEntryQuery) {
  const [containsText, setContainsText] = useState<string>('');
  const [includesTags, updateIncludesTags] = useTagList([]);

  return (
    <Layout dashboard type='focus'>
      <Card>
        <div class={ENTRY_GRID}>
          <IconAlignJustified class='w-5 pt-1.5' stroke={1} />
          <input
            class={ENTRY_INPUT_FIELD}
            type='text'
            value={containsText}
            onKeyUp={async (ev) => {
              await setContainsText(
                (ev.target as HTMLTextAreaElement).value,
              );
              updateEntryList.value++;
            }}
          />
          <IconTag class='w-5 pt-1.5' stroke={1} />
          <input
            type='text'
            class={ENTRY_INPUT_FIELD}
            onKeyUp={(ev: KeyboardEvent) => {
              return certainKeyPressed(ev, ['Enter'], (ev) => {
                const newValue = (ev.target as HTMLInputElement).value;
                if (newValue.replace(' ', '').length > 0) {
                  updateIncludesTags([newValue], []);
                }
                (ev.target as HTMLInputElement).value = '';
                updateEntryList.value++;
              });
            }}
          />
        </div>
        <Chiplist
          values={includesTags}
          onRemove={(ev: Event) => {
            const target = ev.target as HTMLButtonElement;
            const chipValue = (target.previousSibling as HTMLElement).innerHTML;
            updateIncludesTags([], [chipValue]);
            updateEntryList.value++;
          }}
          class='ml-6 mt-1.5'
        />
      </Card>
    </Layout>
  );
}

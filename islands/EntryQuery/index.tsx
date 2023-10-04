import { Chiplist, Layout, Main, Panel } from 'lunchbox';
import { certainKeyPressed } from 'lunchbox/handlers.ts';
import { EntryList } from '../EntryList/index.tsx';
import { useState } from 'preact/hooks';
import { updateEntryList } from 'signals';
import IconTag from 'icons/tag.tsx';
import AlignJustifiedTag from 'icons/align-justified.tsx';
import { useTagList } from 'hooks';
import { iApp } from 'db/index.ts';

interface iEntryQuery {
  appConfiguration: iApp;
}

export function EntryQuery(props: iEntryQuery) {
  const [containsText, setContainsText] = useState<string>('');
  const [includesTags, updateIncludesTags] = useTagList([]);

  return (
    <>
      <Panel class='mt-10'>
        <Layout type='full'>
          <div class='py-3'>
            <div class='isl-EntryInput-row'>
              <AlignJustifiedTag class='w-5 pt-1.5' stroke={1} />
              <input
                class='comp-input isl-EntryInput-field'
                type='text'
                value={containsText}
                onKeyUp={async (ev) => {
                  await setContainsText(
                    (ev.target as HTMLTextAreaElement).value,
                  );
                  updateEntryList.value++;
                }}
              />
            </div>
            <div class='isl-EntryInput-row'>
              <IconTag class='w-5 pt-1.5' stroke={1} />
              <input
                type='text'
                class='comp-input isl-EntryInput-field'
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
                const chipValue =
                  (target.previousSibling as HTMLElement).innerHTML;
                updateIncludesTags([], [chipValue]);
                updateEntryList.value++;
              }}
              class='ml-6 mt-1.5'
            />
          </div>
        </Layout>
      </Panel>
      <Main>
        <Layout type='full'>
          <EntryList
            contributionCalendar
            query={{
              contains_text: containsText,
              includes_tags: includesTags,
            }}
          />
        </Layout>
      </Main>
    </>
  );
}

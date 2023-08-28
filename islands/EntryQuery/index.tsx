import { Button, Layout, Main, Panel } from 'lunchbox';
import { EntryList } from '../EntryList/index.tsx';
import { useSignal } from '@preact/signals';
import { Ref, useRef, useState } from 'preact/hooks';

export function EntryQuery() {
  const updateEntriesSignal = useSignal<number>(0);
  const [containsText, setContainsText] = useState<string | undefined>(
    undefined,
  );
  const containsTextInputRef = useRef<HTMLInputElement>();

  // contains_text
  // created_before
  // created_after
  // includes_tags
  // excludes_tags

  return (
    <>
      <Panel>
        <Layout type='full'>
          <div class='py-3'>
            <input
              class='comp-input clr-bg-panel-10 isl-inputNote-field'
              type='text'
              ref={containsTextInputRef as Ref<HTMLInputElement>}
            />
            <Button
              onClick={(_ev) => {
                const containsTextInput = containsTextInputRef.current;
                if (containsTextInput && containsTextInput.value) {
                  setContainsText(containsTextInput.value);
                }
              }}
            >
              Search
            </Button>
          </div>
        </Layout>
      </Panel>
      <Main>
        <Layout class='pt-6' type='full'>
          <EntryList
            updateEntriesSignal={updateEntriesSignal}
          />
        </Layout>
      </Main>
    </>
  );
}

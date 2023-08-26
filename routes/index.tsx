import { Header, Layout, Main, Panel, Text } from 'lunchbox';
import { useSignal } from '@preact/signals';
import { InputNote } from '../islands/InputNote/index.tsx';
import { EntryList } from '../islands/EntryList/index.tsx';

export default function Home() {
  const updateEntriesSignal = useSignal<number>(0);

  return (
    <Main>
      <Layout type='full'>
        <Panel>
          <InputNote updateEntriesSignal={updateEntriesSignal} />
        </Panel>
      </Layout>
      <Layout class='pt-6' type='full'>
        <EntryList updateEntriesSignal={updateEntriesSignal} />
      </Layout>
    </Main>
  );
}

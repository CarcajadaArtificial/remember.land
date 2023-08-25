import { Header, Layout, Main, Panel, Text } from 'lunchbox';
import { useSignal } from '@preact/signals';
import { InputNote } from '../islands/InputNote/index.tsx';
import { EntryList } from '../islands/EntryList/index.tsx';

export default function Home() {
  const updateLocalStorage = useSignal<number>(0);

  return (
    <Main>
      <Layout type='full'>
        <InputNote updateLocalStorage={updateLocalStorage} />
      </Layout>
      <Layout class='py-6' type='full'>
        <EntryList updateLocalStorage={updateLocalStorage} />
      </Layout>
    </Main>
  );
}

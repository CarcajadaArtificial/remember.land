import { Layout, Link, Main, Navigation, Panel, Text } from 'lunchbox';
import { datetime } from 'ptera';
import { useSignal } from '@preact/signals';
import { InputNote } from '../islands/InputNote/index.tsx';
import { EntryList } from '../islands/EntryList/index.tsx';

export default function Home() {
  const updateEntriesSignal = useSignal<number>(0);
  const today = datetime(new Date(), { timezone: 'America/Mexico_City' });

  return (
    <div>
      <Navigation class='py-3'>
        <Text>{today.format('MMMM-dd')}</Text>
        <Link href='/archive'>Archive</Link>
      </Navigation>
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
    </div>
  );
}

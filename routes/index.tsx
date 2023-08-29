import { Layout, Link, Main, Navigation, Panel, Text } from 'lunchbox';
import { datetime } from 'ptera';
import { useSignal } from '@preact/signals';
import { EntryInput } from '../islands/EntryInput/index.tsx';
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
            <EntryInput
              entry={{
                id: '',
                content: '',
                entry_mark: '',
                tags: [],
                created_at: new Date(),
              }}
              updateEntriesSignal={updateEntriesSignal}
              onFocusOut={() => {}}
            />
          </Panel>
        </Layout>
        <Layout class='pt-6' type='full'>
          <EntryList updateEntriesSignal={updateEntriesSignal} />
        </Layout>
      </Main>
    </div>
  );
}

import { Layout, Link, Main, Navigation, Panel, Text } from 'lunchbox';
import { datetime } from 'ptera';
import { useSignal } from '@preact/signals';
import { EntryInput } from '../islands/EntryInput/index.tsx';
import { EntryList } from '../islands/EntryList/index.tsx';
import { Handlers } from '$fresh/server.ts';
import { redirect } from 'redirect';
import { WithSession } from 'fresh_session';

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  GET(_req, ctx) {
    return ctx.state.session.get('isSignedIn')
      ? ctx.render({
        session: ctx.state.session.data,
      })
      : redirect('/signin');
  },
};

export default function Home() {
  const updateEntriesSignal = useSignal<number>(0);
  const today = datetime(new Date());

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
                _id: '',
                content: '',
                entry_mark: '',
                tags: [],
                utc_created_at: new Date().toUTCString(),
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

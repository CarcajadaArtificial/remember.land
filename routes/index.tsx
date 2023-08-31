import { datetime, diffInDays } from 'ptera';
import { WithSession } from 'fresh_session';
import { Handlers } from '$fresh/server.ts';
import { Footer, Layout, Link, Main, Navigation, Panel, Text } from 'lunchbox';
import { EntryInput } from '../islands/EntryInput/index.tsx';
import { EntryList } from '../islands/EntryList/index.tsx';
import { redirect } from 'redirect';
import { getApp } from 'db/index.ts';

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

export default async function Home() {
  const today = datetime(new Date());

  const appConfig = await getApp();
  const startingDate = datetime(
    appConfig ? new Date(appConfig.startingUtcDate) : new Date(),
  );
  const day_count_today = diffInDays(startingDate, datetime());

  return (
    <div>
      <Navigation class='py-3'>
        <Text>{today.format('MMMM-dd')}</Text>
        <div class='flex gap-6'>
          <Link href='/archive'>Archive</Link>
        </div>
      </Navigation>
      <Main class='min-h-screen'>
        <Layout type='full'>
          <Panel>
            <EntryInput
              entry={{
                _id: '',
                content: '',
                entry_mark: '',
                tags: [],
                utc_created_at: new Date().toUTCString(),
                day_count: day_count_today,
              }}
              onFocusOut={() => {}}
            />
          </Panel>
        </Layout>
        <Layout class='pt-6' type='halves'>
          <div class='grid gap-3'>
            <EntryList
              query={{
                includes_tags: ['permanent'],
              }}
            />
            <EntryList
              query={{
                created_on_day_count: day_count_today,
                excludes_tags: ['task', 'event', 'permanent'],
              }}
            />
          </div>
          <div class='grid gap-3'>
            <EntryList
              query={{
                includes_tags: ['event'],
              }}
            />
            <EntryList
              query={{
                includes_tags: ['task'],
                excludes_tags: ['done'],
              }}
            />
          </div>
        </Layout>
      </Main>
      <Footer layout_type='right'>
        <div></div>
        <Link href='/signout'>SignOut</Link>
      </Footer>
    </div>
  );
}

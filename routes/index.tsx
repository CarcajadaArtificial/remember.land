import { DateTime, datetime, diffInDays } from 'ptera';
import { WithSession } from 'fresh_session';
import { Handlers, PageProps } from '$fresh/server.ts';
import { Card, Footer, Layout, Link, Main, Navigation, Text } from 'lunchbox';
import { EntryInput } from '../islands/EntryInput/index.tsx';
import { EntryList } from '../islands/EntryList/index.tsx';
import TagUpdater from '../islands/TagUpdater/index.tsx';
import { redirect } from 'redirect';
import { getApp, iApp } from 'db/index.ts';

interface HomePageData {
  session: Record<string, string>;
  today: DateTime;
  appConfig: iApp;
  startingDate: DateTime;
  day_count_today: number;
}

export const handler: Handlers<
  HomePageData,
  WithSession
> = {
  async GET(_req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return redirect('/signin');
    }

    const today = datetime(new Date());
    const appConfig = await getApp();

    if (appConfig === null) {
      return redirect('/asdfg');
    }

    const startingDate = datetime(new Date(appConfig.startingUtcDate));
    const day_count_today = diffInDays(startingDate, datetime());

    const pageData: HomePageData = {
      session: ctx.state.session.data,
      today: today,
      appConfig: appConfig,
      startingDate: startingDate,
      day_count_today: day_count_today,
    };

    return ctx.render(pageData);
  },
};

export default function Home(props: PageProps<HomePageData>) {
  const { today, appConfig, day_count_today } = props.data;

  return (
    <>
      <Navigation class='py-3'>
        <Layout dashboard type='left'>
          <Text>{today.format('MMM d')}</Text>
          <div class='flex gap-6'>
            <Link href='/archive'>Archive</Link>
          </div>
        </Layout>
      </Navigation>
      <Main
        data-starting_utc_date={appConfig?.startingUtcDate}
        class='min-h-screen mt-10 flex flex-col gap-9'
      >
        <TagUpdater />
        <Layout dashboard type='focus'>
          <Card>
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
          </Card>
        </Layout>
        <EntryList
          query={{
            // created_on_day_count: day_count_today,
            // excludes_tags: ['task', 'event', 'permanent'],
          }}
        />
      </Main>
      <Footer layout_type='right'>
        <div></div>
        <Link href='/signout'>SignOut</Link>
      </Footer>
    </>
  );
}

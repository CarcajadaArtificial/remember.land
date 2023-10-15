import { DateTime, datetime, diffInDays } from 'ptera';
import { WithSession } from 'fresh_session';
import { Handlers, PageProps } from '$fresh/server.ts';
import { Card, Footer, Layout, Link, Main, Navigation, Text } from 'lunchbox';
import { dbEntry, getAllEntries } from 'db/entry.ts';
import { dbTag, getAllTags, iTag } from 'db/tag.ts';
import { EntryInput } from 'islands/EntryInput/index.tsx';
import { EntryList } from 'components/EntryList/index.tsx';
import { redirect } from 'redirect';
import { getApp, iApp } from 'db/index.ts';
import { createDictionaryDocument } from 'utils';

interface HomePageData {
  session: Record<string, string>;
  today: DateTime;
  appConfig: iApp;
  startingDate: DateTime;
  day_count_today: number;
  entries: dbEntry[];
  tags: dbTag[];
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
      return redirect('/404');
    }

    const startingDate = datetime(new Date(appConfig.startingUtcDate));
    const day_count_today = diffInDays(startingDate, datetime());
    const entries = (await getAllEntries()).result;
    const tags = (await getAllTags()).result;
    const tagDictionary = createDictionaryDocument<iTag>(tags);
    const entriesWithTagNames = entries.map((entry) => {
      entry.value.tags = entry.value.tags.map((tag) => tagDictionary[tag].name);
      return entry;
    });

    const pageData: HomePageData = {
      session: ctx.state.session.data,
      today,
      appConfig,
      startingDate,
      day_count_today,
      entries: entriesWithTagNames,
      tags,
    };

    return ctx.render(pageData);
  },
};

export default function Home(props: PageProps<HomePageData>) {
  const { today, appConfig, day_count_today, entries, tags } = props.data;

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
        <Layout dashboard type='focus'>
          <Card class='mb-6'>
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
          <EntryList entries={entries} />
        </Layout>
      </Main>
      <Footer layout_type='right'>
        <div></div>
        <Link href='/signout'>SignOut</Link>
      </Footer>
    </>
  );
}

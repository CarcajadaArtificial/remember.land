import { datetime, diffInDays } from 'ptera';
import { WithSession } from 'fresh_session';
import { Handlers, PageProps } from '$fresh/server.ts';
import { Card, Layout } from 'lunchbox';
import { dbEntry, getAllEntries } from 'db/entry.ts';
import { dbTag, getAllTags } from 'db/tag.ts';
import { getApp, iApp } from 'db/index.ts';
import { EntryInput } from 'islands/EntryInput/index.tsx';
import { EntryList } from 'components/EntryList/index.tsx';
import Page from 'components/Page/index.tsx';
import { redirect } from 'redirect';
import { indexEntries } from 'utils';

interface HomePageData {
  session: Record<string, string>;
  appConfig: iApp;
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

    const appConfig = await getApp();

    if (appConfig === null) {
      return redirect('/404');
    }

    const entries = (await getAllEntries()).result;
    const tags = (await getAllTags()).result;
    const indexedEntries = indexEntries(entries, tags);

    const pageData: HomePageData = {
      session: ctx.state.session.data,
      appConfig,
      entries: indexedEntries,
      tags,
    };

    return ctx.render(pageData);
  },
};

export default function Home(props: PageProps<HomePageData>) {
  const { appConfig, entries } = props.data;

  const day_count_today = diffInDays(
    datetime(new Date(appConfig.startingUtcDate)),
    datetime(),
  );

  return (
    <Page appConfig={appConfig} currentPage='home'>
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
    </Page>
  );
}

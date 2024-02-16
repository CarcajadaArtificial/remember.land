import { datetime, diffInDays } from 'ptera';
import { JSX } from 'preact';
import { defineRoute } from '$fresh/server.ts';
import { Card, Code, Header, Layout, Main, Text } from 'lunchbox';
import { getAllEntries } from 'db/entry.ts';
import { getAllTags } from 'db/tag.ts';
import { getApp } from 'db/index.ts';
import { EntryInput } from 'islands/EntryInput/index.tsx';
import { EntryList } from 'components/EntryList/index.tsx';
import Page from 'components/Page/index.tsx';
import { indexEntries } from 'utils';
import type { SignedInState } from '@/plugins/session.ts';
import AuthButton from '@/components/AuthButton/index.tsx';
import { redirect } from '@/utils/http.ts';

const HomeSignedOut = (
  props: {},
): JSX.Element => (
  <>
    <Header banner layout_type='left'>
      <Text type='display'>
        Welcome to <br /> <Code>remember.land</Code>
      </Text>
    </Header>
    <Main layout_type='left'>
      <></>
      <div>
        <Text type='subheading' noMargins>SignIn</Text>
        <AuthButton provider='GitHub' />
      </div>
    </Main>
  </>
);

export default defineRoute<SignedInState>(async (_req, ctx) => {
  const appConfig = (await getApp())!;
  const entries = (await getAllEntries()).result;
  const tags = (await getAllTags()).result;
  const indexedEntries = indexEntries(entries, tags);
  const isSignedIn = ctx.state.sessionUser !== undefined;

  if (appConfig === null) redirect('/404');

  const day_count_today = diffInDays(
    datetime(new Date(appConfig.startingUtcDate)),
    datetime(),
  );

  if (!isSignedIn) return <HomeSignedOut />;

  return (
    <Page appConfig={appConfig} currentPage='home'>
      <Layout dashboard type='focus'>
      </Layout>
    </Page>
  );

  // return (
  //   <Page appConfig={appConfig} currentPage='home'>
  //     <Layout dashboard type='focus'>
  //       <Card class='mb-6'>
  //         <EntryInput
  //           entry={{
  //             _id: '',
  //             content: '',
  //             entry_mark: '',
  //             tags: [],
  //             utc_created_at: new Date().toUTCString(),
  //             day_count: day_count_today,
  //           }}
  //           onFocusOut={() => {}}
  //         />
  //       </Card>
  //       <EntryList entries={entries} />
  //     </Layout>
  //   </Page>
  // );
});

import { JSX } from 'preact';
import { defineRoute } from '$fresh/server.ts';
// import { datetime, diffInDays } from 'ptera';
import { Code, Header, Layout, Main, Text } from 'lunchbox';
import type { SignedInState } from '@/plugins/session.ts';
import Page from '@/components/Page/index.tsx';
import AuthButton from '@/components/AuthButton/index.tsx';
import EntryInput from '@/islands/EntryInput/index.tsx';

const HomeSignedOut = (): JSX.Element => (
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

export default defineRoute<SignedInState>((_req, ctx) => {
  // const day_count_today = diffInDays(
  //   datetime(new Date(appConfig.startingUtcDate)),
  //   datetime(),
  // );

  if (!(ctx.state.sessionUser !== undefined)) return <HomeSignedOut />;

  return (
    <Page currentPage='home'>
      <Layout dashboard type='focus'>
        <EntryInput
          userTags={[]}
          entry={{
            id: '',
            createdAtUTC: new Date().toUTCString(),
            content: '',
            tagIds: [],
            mark: '',
            dayCount: 0,
          }}
        />
      </Layout>
    </Page>
  );
});

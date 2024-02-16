import { EntryQuery } from 'islands/EntryQuery/index.tsx';
import Page from 'components/Page/index.tsx';
import { defineRoute } from '$fresh/server.ts';
import type { SignedInState } from '@/plugins/session.ts';
import { getApp } from 'db/index.ts';

export default defineRoute<SignedInState>(async (_req, ctx) => {
  const isSignedIn = ctx.state.sessionUser !== undefined;
  const appConfig = (await getApp())!;

  console.log(isSignedIn);

  return (
    <Page appConfig={appConfig} currentPage='archive'>
      <EntryQuery appConfiguration={appConfig} />
    </Page>
  );
});

import { Layout, Link, Navigation } from 'lunchbox';
import { datetime } from 'ptera';
import { EntryQuery } from '../islands/EntryQuery/index.tsx';
import { Handlers } from '$fresh/server.ts';
import { redirect } from 'redirect';
import { WithSession } from 'fresh_session';
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

export default async function Archive() {
  const today = datetime(new Date());
  const appConfiguration = await getApp();

  return (
    <div>
      <Navigation class='py-3'>
        <Layout dashboard type='left'>
          <Link href='./'>{today.format('MMM d')}</Link>
        </Layout>
      </Navigation>
      {appConfiguration
        ? <EntryQuery appConfiguration={appConfiguration} />
        : <>App Config Error</>}
    </div>
  );
}

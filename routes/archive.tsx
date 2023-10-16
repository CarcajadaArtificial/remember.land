import { datetime } from 'ptera';
import { EntryQuery } from 'islands/EntryQuery/index.tsx';
import Navigation from 'components/Navigation/index.tsx';
import Footer from 'components/Footer/index.tsx';
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
    <>
      <Navigation currentPage='archive' />
      {appConfiguration
        ? <EntryQuery appConfiguration={appConfiguration} />
        : <>App Config Error</>}
      <Footer />
    </>
  );
}

import { Link, Navigation } from 'lunchbox';
import { datetime } from 'ptera';
import { EntryQuery } from '../islands/EntryQuery/index.tsx';
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

export default function Archive() {
  const today = datetime(new Date(), { timezone: 'America/Mexico_City' });

  return (
    <div>
      <Navigation class='py-3'>
        <Link href='./'>{today.format('MMMM-dd')}</Link>
      </Navigation>
      <EntryQuery />
    </div>
  );
}

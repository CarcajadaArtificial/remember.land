import { Handlers } from '$fresh/server.ts';
import { redirect } from 'redirect';
import { WithSession } from 'fresh_session';

type Data = { session: Record<string, string> };

export const handler: Handlers<Data, WithSession> = {
  GET(_req, ctx) {
    ctx.state.session.set('isSignedIn', false);
    ctx.state.session.clear();

    return redirect('/signin');
  },
};

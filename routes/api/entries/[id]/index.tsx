import { type Handlers } from '$fresh/server.ts';
import { findEntries } from 'db/entry.ts';
import { WithSession } from 'fresh_session';
import { redirect } from 'redirect';

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async GET(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return redirect('/signin');
    }
    const foundEntries = await findEntries({ _id: ctx.params.id });
    return new Response(JSON.stringify(foundEntries));
  },
};

import { type Handlers } from '$fresh/server.ts';
import { deleteEntry } from 'db/entry.ts';
import { WithSession } from 'fresh_session';

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async POST(_req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    await deleteEntry(ctx.params.id);
    return new Response(JSON.stringify({}));
  },
};

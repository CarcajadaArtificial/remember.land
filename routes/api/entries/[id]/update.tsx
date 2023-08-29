import { type Handlers } from '$fresh/server.ts';
import { iEntry, updateEntry } from 'db/entry.ts';
import { WithSession } from 'fresh_session';

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const entry = (await req.json()) as iEntry;
    const updatedEntry = await updateEntry(ctx.params.id, entry);
    return new Response(JSON.stringify(updatedEntry));
  },
};

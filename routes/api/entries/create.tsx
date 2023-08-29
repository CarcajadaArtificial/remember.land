import { type Handlers, Status } from '$fresh/server.ts';
import { iEntry, insertEntry } from 'db/entry.ts';
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
    const insertedEntry = await insertEntry(entry);
    return new Response(JSON.stringify(insertedEntry));
  },
};

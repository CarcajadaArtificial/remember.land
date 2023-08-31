import { type Handlers } from '$fresh/server.ts';
import { WithSession } from 'fresh_session';
import { addEntry, LargeKvEntry } from 'db/entry.ts';

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const entry = (await req.json()) as LargeKvEntry;

    const insertedEntry = await addEntry(entry);
    return new Response(JSON.stringify(insertedEntry));
  },
};

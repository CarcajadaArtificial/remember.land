import { type Handlers } from '$fresh/server.ts';
import { WithSession } from 'fresh_session';
import { dbEntry, findEntries, iQueryEntries } from 'db/entry.ts';

export type findEntryReq = {
  query: iQueryEntries;
};

export type findEntryRes = dbEntry[];

export const handler: Handlers<
  { session: Record<string, string> },
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const { query } = await req.json() as findEntryReq;
    const entries = await findEntries(query);
    return new Response(JSON.stringify(entries));
  },
};

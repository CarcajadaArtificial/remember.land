import { type Handlers } from '$fresh/server.ts';
import { WithSession } from 'fresh_session';
import { findEntries, iQueryEntries, LargeKvEntry } from 'db/entry.ts';
import { Document } from 'kvdex';

export type findEntryReq = {
  query: iQueryEntries;
};

export type findEntryRes = Document<LargeKvEntry>[];

export const handler: Handlers<
  { session: Record<string, string> },
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const { query } = await req.json() as findEntryReq;
    const entries = (await findEntries(query)).result;
    return new Response(JSON.stringify(entries));
  },
};

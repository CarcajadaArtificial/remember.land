import { type Handlers } from '$fresh/server.ts';
import { DbResults, Projection } from 'tilia/src/types.ts';
import { docEntry, findEntries } from 'db/entry.ts';
import { WithSession } from 'fresh_session';
import { iQueryEntries } from 'db/entry.ts';

export type findReq = {
  query: iQueryEntries;
};

export type findRes = DbResults<docEntry>;

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const { query } = await req.json() as findReq;
    const entries = await findEntries(query);
    return new Response(JSON.stringify(entries));
  },
};

import { type Handlers } from '$fresh/server.ts';
import { DbResults, Projection } from 'tilia/src/types.ts';
import { findEntries } from 'db/middleware.ts';
import { docEntry } from 'db/entry.ts';
import { WithSession } from 'fresh_session';

export type findReq = {
  query: Partial<docEntry>;
  projection: Partial<Projection<keyof docEntry>>;
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
    const { query, projection } = await req.json() as findReq;
    const entries = await findEntries(query, projection);
    return new Response(JSON.stringify(entries));
  },
};

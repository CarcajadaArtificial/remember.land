import { type Handlers } from '$fresh/server.ts';
import { DbResults, Projection } from 'tilia/src/types.ts';
import { findEntries } from 'db/middleware.ts';
import { docEntry } from 'db/entry.ts';

export type findReq = {
  query: Partial<docEntry>;
  projection: Partial<Projection<keyof docEntry>>;
};

export type findRes = DbResults<docEntry>;

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { query, projection } = await req.json() as findReq;
    const entries = await findEntries(query, projection);
    return new Response(JSON.stringify(entries));
  },
};

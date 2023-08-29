import { type Handlers } from '$fresh/server.ts';
import { findEntries } from 'db/middleware.ts';
import { iEntry } from 'db/entry.ts';

export const handler: Handlers = {
  async GET(req, ctx) {
    const foundEntries = await findEntries({ _id: ctx.params.id });
    return new Response(JSON.stringify(foundEntries));
  },
};

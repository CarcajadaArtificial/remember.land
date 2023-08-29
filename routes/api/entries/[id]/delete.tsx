import { type Handlers } from '$fresh/server.ts';
import { deleteEntry } from 'db/middleware.ts';
import { iEntry } from 'db/entry.ts';

export const handler: Handlers = {
  async POST(req, ctx) {
    const entry = (await req.json()) as iEntry;
    const updatedEntry = await deleteEntry(ctx.params.id);
    return new Response(JSON.stringify(updatedEntry));
  },
};

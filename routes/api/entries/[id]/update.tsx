import { type Handlers } from '$fresh/server.ts';
import { updateEntry } from 'db/middleware.ts';
import { iEntry } from 'db/entry.ts';

export const handler: Handlers = {
  async POST(req, ctx) {
    const entry = (await req.json()) as iEntry;
    const updatedEntry = await updateEntry(ctx.params.id, entry);
    return new Response(JSON.stringify(updatedEntry));
  },
};

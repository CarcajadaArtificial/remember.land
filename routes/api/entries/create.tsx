import { type Handlers, Status } from '$fresh/server.ts';
import { insertEntry } from 'db/middleware.ts';
import { iEntry } from 'db/entry.ts';

export const handler: Handlers = {
  async POST(req, _ctx) {
    const entry = (await req.json()) as iEntry;
    const insertedEntry = await insertEntry(entry);
    return new Response(JSON.stringify(insertedEntry));
  },
};

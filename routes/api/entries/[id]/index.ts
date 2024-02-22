import { type Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  async POST(req, ctx) {
    await console.log('api/entries/[id]/index', req, ctx);
    return new Response('api/entries/[id]/index');
  },
};

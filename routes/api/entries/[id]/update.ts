import { type Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  async POST(req, ctx) {
    await console.log('api/entries/[id]/update', req, ctx);
    return new Response('api/entries/[id]/update');
  },
};

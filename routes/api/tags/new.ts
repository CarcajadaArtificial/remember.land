import { type Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  async POST(req, ctx) {
    await console.log('api/tags/new', req, ctx);
    return new Response('api/tags/new');
  },
};

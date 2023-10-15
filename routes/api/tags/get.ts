import { type Handlers } from '$fresh/server.ts';
import { WithSession } from 'fresh_session';
import { dbTag, findTags, iQueryTags } from 'db/tag.ts';
import { Document } from 'kvdex';

export type findTagReq = {
  query: iQueryTags;
};

export type findTagRes = dbTag[];

export const handler: Handlers<
  { session: Record<string, string> },
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const { query } = await req.json() as findTagReq;
    const tags = (await findTags(query)).result;
    return new Response(JSON.stringify(tags));
  },
};

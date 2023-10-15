import { type Handlers } from '$fresh/server.ts';
import { WithSession } from 'fresh_session';
import { findTags, iQueryTags, LargeKvTag } from 'db/tag.ts';
import { Document } from 'kvdex';

export type findTagReq = {
  query: iQueryTags;
};

export type findTagRes = Document<LargeKvTag>[];

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

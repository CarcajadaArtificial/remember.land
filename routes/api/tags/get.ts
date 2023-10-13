import { type Handlers } from '$fresh/server.ts';
import { DbResults } from 'tilia/src/types.ts';
import { iTag } from 'db/tag.ts';
import { WithSession } from 'fresh_session';
import { findTags, iQueryTags } from 'db/tag.ts';

export type findTagReq = {
  query: iQueryTags;
};

export type findRes = DbResults<iTag>;

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const { query } = await req.json() as findTagReq;
    const tags = await findTags(query);
    return new Response(JSON.stringify(tags.result));
  },
};

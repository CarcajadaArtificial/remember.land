import { type Handlers } from '$fresh/server.ts';
import { WithSession } from 'fresh_session';
import { addTag, LargeKvTag } from 'db/tag.ts';

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const tag = (await req.json()) as LargeKvTag;

    const insertedTag = await addTag(tag);
    return new Response(JSON.stringify(insertedTag));
  },
};

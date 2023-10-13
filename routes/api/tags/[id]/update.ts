import { type Handlers } from '$fresh/server.ts';
import { LargeKvTag, updateTag } from 'db/tag.ts';
import { WithSession } from 'fresh_session';

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
    const updatedTag = await updateTag(ctx.params.id, tag);
    return new Response(JSON.stringify(updatedTag));
  },
};

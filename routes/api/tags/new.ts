import { type Handlers } from '$fresh/server.ts';
import { type iTag, TagDTO } from '@/utils/dto.ts';
import type { SignedInState } from '@/plugins/session.ts';
import { createTag } from '@/utils/db/tag.ts';

export interface ReqNewTag {
  tag: iTag;
}

export interface ResNewTag {
  tag: iTag;
}

export const handler: Handlers<ReqNewTag, SignedInState> = {
  async POST(req, ctx) {
    const tag = TagDTO.parse((await req.json()).tag);

    await createTag(
      tag,
      ctx.state.sessionUser.id,
    );

    return Response.json({ tag: tag });
  },
};

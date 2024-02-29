import { type Handlers } from '$fresh/server.ts';
import { type iTag, TagDTO } from '@/utils/dto.ts';
import type { SignedInState } from '@/plugins/session.ts';
import { editTag } from '@/utils/db/tag.ts';

export interface ReqEditTag {
  tag: iTag;
}

export interface ResEditTag {
  tag: iTag;
}

export const handler: Handlers<ReqEditTag, SignedInState> = {
  async POST(req, ctx) {
    const tag = TagDTO.parse((await req.json()).tag);

    await editTag(
      tag,
      ctx.state.sessionUser.id,
    );

    return Response.json({ tag: tag });
  },
};

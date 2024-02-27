import { defineRoute } from '$fresh/server.ts';
import { Main } from 'lunchbox';
import type { SignedInState } from '@/plugins/session.ts';
import Page from '@/components/Page/index.tsx';
import { getTags } from '@/utils/db/tag.ts';
import { kvIteratorToEntryArray } from '@/utils/db/index.ts';
import TagEdit from '@/islands/TagEdit/index.tsx';

export default defineRoute<SignedInState>(async (_req, ctx) => {
  const user = ctx.state.sessionUser;

  const userTags = (await kvIteratorToEntryArray(getTags(user.id))).map(
    (kvEntryTag) => kvEntryTag.value,
  );

  return (
    <Page currentPage='tags'>
      <Main layout_type='focus'>
        {userTags.map((userTag) => <TagEdit tag={userTag} userId={user.id} />)}
      </Main>
    </Page>
  );
});

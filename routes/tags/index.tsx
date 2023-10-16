import { WithSession } from 'fresh_session';
import { Handlers, PageProps } from '$fresh/server.ts';
import Page from 'components/Page/index.tsx';
import TagQuery from 'islands/TagQuery/index.tsx';
import { dbTag, getAllTags } from 'db/tag.ts';
import { redirect } from 'redirect';
import { getApp, iApp } from 'db/index.ts';

interface TagHomePageData {
  session: Record<string, string>;
  appConfig: iApp;
  tags: dbTag[];
}

export const handler: Handlers<
  TagHomePageData,
  WithSession
> = {
  async GET(_req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return redirect('/signin');
    }

    const appConfig = await getApp();

    if (appConfig === null) {
      return redirect('/404');
    }

    const pageData: TagHomePageData = {
      session: ctx.state.session.data,
      appConfig,
      tags: (await getAllTags()).result,
    };

    return ctx.render(pageData);
  },
};

export default function TagHome(props: PageProps<TagHomePageData>) {
  const { appConfig, tags } = props.data;

  return (
    <Page appConfig={appConfig} currentPage='tags'>
      <TagQuery tags={tags} />
    </Page>
  );
}

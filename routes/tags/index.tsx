import { WithSession } from 'fresh_session';
import { Handlers, PageProps } from '$fresh/server.ts';
import { Footer, Link, Main } from 'lunchbox';
import Navigation from 'components/Navigation/index.tsx';
import { dbTag, getAllTags } from 'db/tag.ts';
import { redirect } from 'redirect';
import { getApp, iApp } from 'db/index.ts';

interface HomePageData {
  session: Record<string, string>;
  appConfig: iApp;
  tags: dbTag[];
}

export const handler: Handlers<
  HomePageData,
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

    const pageData: HomePageData = {
      session: ctx.state.session.data,
      appConfig,
      tags: (await getAllTags()).result,
    };

    return ctx.render(pageData);
  },
};

export default function TagHome(props: PageProps<HomePageData>) {
  const { appConfig, tags } = props.data;

  return (
    <>
      <Navigation currentPage='tags' />
      <Main
        data-starting_utc_date={appConfig?.startingUtcDate}
        class='min-h-screen mt-10 flex flex-col gap-9'
      >
      </Main>
      <Footer layout_type='right'>
        <div></div>
        <Link href='/signout'>SignOut</Link>
      </Footer>
    </>
  );
}

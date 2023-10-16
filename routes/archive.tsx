import { EntryQuery } from 'islands/EntryQuery/index.tsx';
import Page from 'components/Page/index.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';
import { redirect } from 'redirect';
import { WithSession } from 'fresh_session';
import { getApp, iApp } from 'db/index.ts';

type ArchivePageData = { session: Record<string, string>; appConfig: iApp };

export const handler: Handlers<
  ArchivePageData,
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

    const pageData: ArchivePageData = {
      session: ctx.state.session.data,
      appConfig,
    };

    return ctx.render(pageData);
  },
};

export default function Archive(props: PageProps<ArchivePageData>) {
  const { appConfig } = props.data;

  return (
    <Page appConfig={appConfig} currentPage='archive'>
      <EntryQuery appConfiguration={appConfig} />
    </Page>
  );
}

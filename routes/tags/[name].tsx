import { WithSession } from 'fresh_session';
import { Handlers, PageProps } from '$fresh/server.ts';
import { Layout, Text } from 'lunchbox';
import Page from 'components/Page/index.tsx';
import { EntryList } from 'components/EntryList/index.tsx';
import { getAllTags } from 'db/tag.ts';
import { dbEntry, findEntries } from 'db/entry.ts';
import { getApp, iApp } from 'db/index.ts';
import { redirect } from 'redirect';
import { indexEntries } from 'utils';

interface TagNamePageData {
  session: Record<string, string>;
  name: string;
  appConfig: iApp;
  entries: dbEntry[];
}

export const handler: Handlers<
  TagNamePageData,
  WithSession
> = {
  async GET(_req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return redirect('/signin');
    }

    const appConfig = await getApp();

    const tags = (await getAllTags()).result;
    const filteredTags = tags.filter((tag) =>
      tag.value.name === ctx.params.name
    );

    if (appConfig === null || filteredTags.length === 0) {
      return redirect('/404');
    }

    const entries = await findEntries({
      includes_tags: filteredTags.map((tag) => tag.id.toString()),
    });

    const indexedEntries = indexEntries(entries, tags);

    const pageData: TagNamePageData = {
      session: ctx.state.session.data,
      name: ctx.params.name,
      appConfig,
      entries: indexedEntries,
    };

    return ctx.render(pageData);
  },
};

export default function TagName(props: PageProps<TagNamePageData>) {
  const { appConfig, name, entries } = props.data;

  return (
    <Page appConfig={appConfig} currentPage='tags'>
      <Layout type='center'>
        <Text type='heading'>{name}</Text>
        <EntryList entries={entries} />
      </Layout>
    </Page>
  );
}

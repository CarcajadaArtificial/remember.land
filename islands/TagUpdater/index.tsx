import { useEffect, useState } from 'preact/hooks';
import { Button, Layout, Text } from 'lunchbox';
import { bring } from 'utils';
import { type findReq } from 'api/entries/get.ts';
import { LargeKvEntry } from 'db/entry.ts';
import { docEntry, iEntry } from 'db/entry.ts';
import { Document } from 'kvdex';
import { DbResults } from 'tilia/src/types.ts';

export default function TagUpdater() {
  const [entries, setEntries] = useState<Document<LargeKvEntry>[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    bring<findReq, Document<LargeKvEntry>[]>('/api/entries/get', 'POST', {
      query: {},
    }, 'Find entries error.')
      .then((res) => {
        if (res) {
          setEntries(res);
          setTags(
            res.flatMap((entry) => entry.value.tags).filter(
              (value, index, self) => {
                return self.indexOf(value) === index;
              },
            ),
          );
        }
      });
  }, []);

  return (
    <Layout type='halves'>
      <div class='grid gap-3'>
        <Button
          onClick={(ev) => {
            entries.map(async (entry) => {
              await bring<iEntry, DbResults<docEntry>>(
                `/api/entries/${entry.id}/update`,
                'POST',
                {
                  utc_created_at: entry.value.utc_created_at,
                  content: entry.value.content,
                  tags: entry.value.tags.map((tag) => tag.replace(/ /g, '_')),
                  entry_mark: entry.value.entry_mark,
                  day_count: entry.value.day_count,
                },
                'Create entry error.',
              );
            });
          }}
        >
          Replace spaces with underscores
        </Button>
        <Button
          onClick={(ev) => {
            // entries.map(async (entry) => {
            //   await bring<iEntry, DbResults<docEntry>>(
            //     `/api/entries/${entry.id}/update`,
            //     'POST',
            //     {
            //       utc_created_at: entry.value.utc_created_at,
            //       content: entry.value.content,
            //       tags: entry.value.tags.map((tag) => tag.replace(/ /g, '_')),
            //       entry_mark: entry.value.entry_mark,
            //       day_count: entry.value.day_count,
            //     },
            //     'Create entry error.',
            //   );
            // });
          }}
        >
          Create Tag Documents
        </Button>
      </div>
      <>
        <Text type='subheading' noMargins>Tags found:</Text>
        {tags.map((tag) => <Text noMargins>{tag}</Text>)}
      </>
    </Layout>
  );
}

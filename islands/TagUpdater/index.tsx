import { useEffect, useState } from 'preact/hooks';
import { Button, Layout, Text } from 'lunchbox';
import { bring } from 'utils';
import { type findEntryReq } from 'api/entries/get.ts';
import { type findTagReq } from 'api/tags/get.ts';
import { LargeKvEntry } from 'db/entry.ts';
import { docTag, iTag, LargeKvTag } from 'db/tag.ts';
import { docEntry, iEntry } from 'db/entry.ts';
import { Document } from 'kvdex';
import { DbResults } from 'tilia/src/types.ts';

export default function TagUpdater() {
  const [entries, setEntries] = useState<Document<LargeKvEntry>[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [dbTags, setDBTags] = useState<Document<LargeKvTag>[]>([]);

  useEffect(() => {
    bring<findEntryReq, Document<LargeKvEntry>[]>('/api/entries/get', 'POST', {
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
            tags.map(async (tag) => {
              await bring<iTag, DbResults<docTag>>(
                `/api/tags/new`,
                'POST',
                { name: tag },
                'Create entry error.',
              );
            });
          }}
        >
          Create Tag Documents
        </Button>

        <Button
          onClick={(ev) => {
            entries.map(async (entry) => {
              const tagIds = await Promise.all(
                entry.value.tags.map(async (tag) => {
                  const resTags = await bring<
                    findTagReq,
                    Document<LargeKvTag>[]
                  >(
                    '/api/tags/get',
                    'POST',
                    {
                      query: {
                        contains_text: tag,
                      },
                    },
                    'Find entries error.',
                  )
                    .then((res) => {
                      if (res) {
                        return res;
                      }
                    });

                  if (resTags === undefined) {
                    console.error('Error, no tag db doc found');
                  } else if (resTags.length === 0) {
                    console.log('Tag already indexed');
                  } else if (resTags.length > 1) {
                    console.error('Error, multiple tags found');
                  } else {
                    return resTags[0].id;
                  }
                }),
              );

              if (tagIds.filter((value) => value !== undefined).length > 0) {
                await bring<iEntry, DbResults<docEntry>>(
                  `/api/entries/${entry.id}/update`,
                  'POST',
                  {
                    utc_created_at: entry.value.utc_created_at,
                    content: entry.value.content,
                    tags: tagIds.map((id) => id!.toString()),
                    entry_mark: entry.value.entry_mark,
                    day_count: entry.value.day_count,
                  },
                  'Create entry error.',
                );
              }
            });
          }}
        >
          Convert entry tags to ids
        </Button>
      </div>
      <>
        <Text type='subheading' noMargins>Tags found:</Text>
        {tags.map((tag) => <Text noMargins>{tag}</Text>)}
      </>
    </Layout>
  );
}

import { useEffect, useRef, useState } from 'preact/hooks';
import { Card, Layout, Link, Text } from 'lunchbox';
import { dbTag } from 'db/tag.ts';
import IconSearch from 'icons/search.tsx';
import { ENTRY_GRID, ENTRY_INPUT_FIELD, ICON_STANDARD } from 'styles';

interface iTagQuery {
  tags: dbTag[];
}

export default function (props: iTagQuery) {
  const [tags, setTags] = useState(props.tags);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refInput.current?.focus();
  }, []);

  return (
    <Layout dashboard type='focus'>
      <Card>
        <div class={ENTRY_GRID}>
          <IconSearch class={ICON_STANDARD} />
          <input
            class={`${ENTRY_INPUT_FIELD} px-1.5`}
            type='text'
            ref={refInput}
            onKeyUp={(ev) => {
              setTags(props.tags.filter((tag) =>
                tag.value.name.includes(ev.currentTarget.value)
              ));
            }}
          />
        </div>
      </Card>
      <div class='mt-6'>
        {tags.map((tag) => (
          <Text noMargins type='subheading'>
            <Link href={`./tags/${tag.value.name}`}>
              {tag.value.name}
            </Link>
          </Text>
        ))}
      </div>
    </Layout>
  );
}

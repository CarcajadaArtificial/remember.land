import { useEffect, useRef, useState } from 'preact/hooks';
import { css } from 'resin';
import { Text } from 'lunchbox';
import IconHash from 'icons/hash.tsx';
import { iTag } from '@/utils/dto.ts';
import { ENTRY_FOCUS_HOVER_BG, ENTRY_INPUT_FIELD } from '@/utils/styles.ts';
import { onSuperEnter } from '@/utils/utils.ts';
import Tag from '@/components/Tag/index.tsx';
import { bring } from '@/utils/utils.ts';
import type { ReqEditTag, ResEditTag } from '@/routes/api/tags/edit.ts';

export interface iTagEdit {
  tag: iTag;
  userId: string;
}

const style = css`
  ${ENTRY_FOCUS_HOVER_BG};
  border-radius: var(--s-quarter);
  &:hover, &:focus {
    padding: var(--s-quarter) 0;
  }

  .tag {
    &_rename {
      ${ENTRY_INPUT_FIELD};
    }

    &_cannot-edit {
      line-height: var(--s-half);
      margin-left: var(--s-one-and-half);
    }
  }
`;

export default function EntryEdit(props: iTagEdit) {
  const { tag, userId } = props;
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const tagRenameInputRef = useRef<HTMLInputElement>(null);
  const [newTagName, setNewTagName] = useState<string>(tag.name);
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(!editMode);

  if (
    editMode &&
    !['event', 'task', 'done', 'important', 'question', 'link'].includes(
      tag.name,
    )
  ) {
    useEffect(() => {
      tagRenameInputRef.current?.focus();
    }, [editMode]);

    return (
      <div
        class={style}
        onKeyDown={onSuperEnter(() => {
          setEditMode(false);
          if (newTagName !== tag.name) {
            bring<ReqEditTag, ResEditTag>(
              `/api/tags/edit`,
              'POST',
              {
                tag: {
                  id: tag.id,
                  name: newTagName,
                },
              },
              'Create entry error.',
            ).then((data) => {
              if (data) {
                console.log('done');
              }
            });
          }
        })}
      >
        <div class='tag_container'>
          <IconHash class='tag_icon' />
          <input
            ref={tagRenameInputRef}
            class='tag_rename'
            onfocusout={() => setEditMode(false)}
            onKeyDown={(ev: KeyboardEvent) =>
              setNewTagName((ev.target as HTMLInputElement).value)}
            value={newTagName}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      tabindex={0}
      class={style}
      ref={tagContainerRef}
      onClick={() => setEditMode(true)}
      onKeyDown={onSuperEnter(() => setEditMode(true))}
    >
      <Tag tag={tag} />
      {editMode
        ? (
          <Text noMargins type='small' class='tag_cannot-edit'>
            This is a built-in tag that cannot be edited or deleted.
          </Text>
        )
        : null}
    </div>
  );
}

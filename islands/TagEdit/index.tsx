import { useRef, useState } from 'preact/hooks';
import { Text } from 'lunchbox';
import { css } from 'resin';
import IconHash from 'icons/hash.tsx';
import { iTag } from '@/utils/db/tag.ts';
import {
  ENTRY_FOCUS_HOVER_BG,
  ENTRY_GRID,
  ENTRY_INPUT_FIELD,
} from '@/utils/styles.ts';
import { onSuperEnter } from '@/utils/utils.ts';

const style = css`
  ${ENTRY_FOCUS_HOVER_BG};
  border-radius: var(--s-quarter);
  &:hover, &:focus {
    padding: var(--s-quarter) 0;
  }

  .tag {
    &_container {
      ${ENTRY_GRID};
    }

    &_icon {
      width: var(--s-single);
      height: var(--s-single);
      margin: var(--s-quarter) 0 0 var(--s-quarter);
    }

    &_rename {
      ${ENTRY_INPUT_FIELD};
    }

    &_cannot-edit {
      line-height: var(--s-half);
      margin-left: var(--s-one-and-half);
    }
  }
  `;

export interface iTagEdit {
  tag: iTag;
  userId: string;
}

export default function EntryEdit(props: iTagEdit) {
  const { tag, userId } = props;
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const tagRenameInputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(!editMode);

  if (
    editMode &&
    !['event', 'task', 'done', 'important', 'question', 'link'].includes(
      tag.name,
    )
  ) {
    return (
      <div class={style} onKeyDown={onSuperEnter(toggleEditMode)}>
        <div class='tag_container'>
          <IconHash class='tag_icon' />
          <input ref={tagRenameInputRef} class='tag_rename' />
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
      onKeyDown={onSuperEnter(toggleEditMode)}
      onfocusout={() => setEditMode(false)}
    >
      <div class='tag_container'>
        <IconHash class='tag_icon' />
        <Text>{tag.name}</Text>
      </div>
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

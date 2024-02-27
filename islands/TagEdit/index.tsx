import { iTag } from '@/utils/db/tag.ts';
import IconHash from 'icons/hash.tsx';
import {
  ENTRY_FOCUS_HOVER_BG,
  ENTRY_GRID,
  ICON_STANDARD,
} from '@/utils/styles.ts';
import { Text } from 'lunchbox';
import { css } from 'resin';

const style = css`
  &:hover, &:focus {
    padding: var(--s-quarter) 0;
  }
  ${ENTRY_FOCUS_HOVER_BG};

  .tag {
    &_container {
      ${ENTRY_GRID};
    }
    &_icon {
      width: var(--s-single);
      height: var(--s-single);
      margin: var(--s-quarter) 0 0 var(--s-quarter);
    }
  }
  `;

export interface iTagEdit {
  tag: iTag;
  userId: string;
}

export default function EntryEdit(props: iTagEdit) {
  const { tag, userId } = props;

  // if (editMode) {
  //   return <></>
  // }

  return (
    <div tabindex={0} class={style}>
      <div class='tag_container'>
        <IconHash class='tag_icon' />
        <Text>{tag.name}</Text>
      </div>
    </div>
  );
}

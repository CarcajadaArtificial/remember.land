import { css } from 'resin';
import { Text } from 'lunchbox';
import IconHash from 'icons/hash.tsx';
import { iTag } from '@/utils/dto.ts';
import { ENTRY_GRID } from '@/utils/styles.ts';

export interface iTagComponent {
  tag: iTag;
}

const style = css`
  ${ENTRY_GRID};

  .tag_icon {
    width: var(--s-single);
    height: var(--s-single);
    margin: var(--s-quarter) 0 0 var(--s-quarter);
  }
`;

export default function Tag(props: iTagComponent) {
  return (
    <div class={style}>
      <IconHash class='tag_icon' />
      <Text>{props.tag.name}</Text>
    </div>
  );
}

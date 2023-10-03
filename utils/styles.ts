import { css } from 'resin';

export const ENTRY_GRID = css`
  display: grid;
  grid-template-columns: var(--s-single) 1fr;
  gap: var(--s-half);
  align-items: center;
  min-height: var(--s-one-and-half)'
`;

export const ICON_STANDARD = css`
  width: var(--s-single);
  height: var(--s-single);
`;

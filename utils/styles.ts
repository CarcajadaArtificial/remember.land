import { css } from 'resin';

export const ENTRY_GRID = css`
  display: grid;
  grid-template-columns: var(--s-single) 1fr;
  gap: var(--s-half);
  min-height: var(--s-one-and-half);
`;

export const ENTRY_INPUT_FIELD = css`
  outline: 0;
  border-radius: var(--s-quarter);
  padding: var(--s-eighth) var(--s-three-eights);
  position: relative;
  right: var(--s-quarter);

  &:focus-within {
    background-color: var(--clr-bg-personality-30);
  }
`;

export const ENTRY_CONTAINER = css`
  outline: 0;
  padding-left: var(--s-single);
  padding-right: var(--s-single);
  border-radius: var(--s-quarter);

  .isl-entry-hidden {
    display: none;
  }

  &:focus {
    padding-top: var(--s-half);
    padding-bottom: var(--s-half);
    margin: var(--s-half) 0;
    background-color: var(--clr-bg-panel-35);

    .isl-entry-hidden {
      display: block;
    }
  }
`;

export const ICON_STANDARD = css`
  width: var(--s-single);
  height: var(--s-single);
  margin-top: var(--s-quarter);
`;

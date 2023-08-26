import { VNode } from 'preact';

interface iInputNoteField {
  icon: VNode;
  shown: boolean;
  value?: string;
  onKeyUp?: (ev: Event) => void;
  onFocus?: (ev: Event) => void;
}

export function InputNoteField(props: iInputNoteField) {
  const { icon, shown, onKeyUp, onFocus, value } = props;

  return (
    <div
      class={!shown
        ? 'isl-inputNote-row_hidden'
        : 'isl-inputNote-row_hidden transition-appears-maxheight'}
    >
      <>{icon}</>
      <input
        type='text'
        class='comp-input isl-inputNote-field'
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        value={value}
      />
    </div>
  );
}

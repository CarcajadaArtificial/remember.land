import { VNode } from 'preact';

interface iInputNoteField {
  icon: VNode;
  shown: boolean;
  onKeyUp?: (ev: Event) => void;
  onFocus?: (ev: Event) => void;
}

export function InputNoteField(props: iInputNoteField) {
  const { icon, shown, onKeyUp, onFocus } = props;

  return (
    <div class={!shown ? 'isl-inputNote-row_hidden' : 'isl-inputNote-row'}>
      <>{icon}</>
      <input
        type='text'
        class='comp-input isl-inputNote-field transition-focus-input-bg'
        onKeyUp={onKeyUp}
        onFocus={onFocus}
      />
    </div>
  );
}

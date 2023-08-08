import { Panel, TextArea } from 'lunchbox';
import { iNote } from '../../utils/db/note.ts';

interface iInputNote extends Partial<iNote> {}

export function InputNote(props: iInputNote) {
  return (
    <Panel>
      <TextArea nostyle class='isl-InputNote' />
    </Panel>
  );
}

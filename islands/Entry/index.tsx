import { Chiplist, Text } from 'lunchbox';
import { format } from 'datetime';
import { iNote } from 'db/note.ts';
import { NoteTypeIndicator } from '../../components/NoteTypeIndicator/index.tsx';

export function Entry(props: Partial<iNote>) {
  return (
    <div tabIndex={0} class='isl-entry-container'>
      <div class='isl-entry-row'>
        <NoteTypeIndicator tags={props.tags} />
        <div>
          <Text noMargins>{props.content}</Text>
        </div>
      </div>
      {props.tags && props.tags.length > 0
        ? <Chiplist values={props.tags} />
        : null}
    </div>
  );
}

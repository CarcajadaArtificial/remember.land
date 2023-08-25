import { Chiplist, Text } from 'lunchbox';
import { format } from 'datetime';
import { iNote } from 'db/note.ts';
import { NoteTypeIndicator } from '../../components/NoteTypeIndicator/index.tsx';

export function Entry(props: Partial<iNote>) {
  return (
    <div tabIndex={0} class='isl-entry-container'>
      <div class='isl-entry-detail_overflow'>
        <Text class='isl-entry-detail' noMargins type='small'>{props.id}</Text>
      </div>
      <div>
        <Text class='isl-entry-detail' noMargins type='small'>
          {props.entry_mark}
        </Text>
      </div>
      <NoteTypeIndicator tags={props.tags} />
      <div>
        <Text noMargins>{props.content}</Text>
      </div>
      <div class='isl-entry-detail_overflow'>
        <Text class='isl-entry-detail' noMargins type='small'>
          {format(new Date(props.created_at!), 'dd-MM')}
        </Text>
      </div>
      <div>
        <Chiplist
          class='isl-entry-detail'
          values={props.tags}
        />
      </div>
    </div>
  );
}

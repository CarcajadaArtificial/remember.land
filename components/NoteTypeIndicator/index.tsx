import { Text } from 'lunchbox';
import { NoteTypes } from 'types';

interface iNoteTypeIndicator {
  type: NoteTypes;
}

function typeToIndicator(type: NoteTypes) {
  switch (type) {
    case 'note':
      return ' - ';
    case 'event':
      return ' ○ ';
    case 'task':
      return ' ☐ ';
    case 'permanent':
      return ' * ';
    default:
      return ' ? ';
  }
}

export function NoteTypeIndicator(props: iNoteTypeIndicator) {
  return (
    <Text class='text-center cursor-default select-none'>
      {typeToIndicator(props.type)}
    </Text>
  );
}

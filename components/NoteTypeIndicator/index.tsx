import { Text } from 'lunchbox';

interface iNoteTypeIndicator {
  tags?: string[];
}

function tagsToIndicator(tags?: string[]): string {
  if (!tags) {
    return ' - ';
  } else if (tags.includes('permanent')) {
    return ' * ';
  } else if (tags.includes('event')) {
    return ' ○ ';
  } else if (tags.includes('task') && !tags.includes('done')) {
    return ' ☐ ';
  } else if (tags.includes('task') && tags.includes('done')) {
    return ' ☑ ';
  } else {
    return ' - ';
  }
}

export function NoteTypeIndicator(props: iNoteTypeIndicator) {
  return (
    <Text class='text-center cursor-default select-none pt-1'>
      {tagsToIndicator(props.tags)}
    </Text>
  );
}

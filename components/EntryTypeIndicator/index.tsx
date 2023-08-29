import { Text } from 'lunchbox';

interface iEntryTypeIndicator {
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

export function EntryTypeIndicator(props: iEntryTypeIndicator) {
  return (
    <Text class='text-center cursor-default select-none'>
      {tagsToIndicator(props.tags)}
    </Text>
  );
}
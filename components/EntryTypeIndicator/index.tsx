import IconAsteriskSimple from 'icons/asterisk-simple.tsx';
import IconMinus from 'icons/minus.tsx';
import IconCircle from 'icons/circle.tsx';
import IconSquare from 'icons/square.tsx';
import IconCheckbox from 'icons/checkbox.tsx';

interface iEntryTypeIndicator {
  tags?: string[];
}

export function EntryTypeIndicator(props: iEntryTypeIndicator) {
  const { tags } = props;

  if (!tags) {
    return <IconMinus />;
  } else if (tags.includes('permanent')) {
    return <IconAsteriskSimple />;
  } else if (tags.includes('event')) {
    return <IconCircle />;
  } else if (tags.includes('task') && !tags.includes('done')) {
    return <IconSquare />;
  } else if (tags.includes('task') && tags.includes('done')) {
    return <IconCheckbox />;
  } else {
    return <IconMinus />;
  }
}

import IconAsteriskSimple from 'icons/asterisk-simple.tsx';
import IconMinus from 'icons/minus.tsx';
import IconCircle from 'icons/circle.tsx';
import IconSquare from 'icons/square.tsx';
import IconCheckbox from 'icons/checkbox.tsx';
import { ICON_STANDARD } from 'styles';

interface iEntryTypeIndicator {
  tags?: string[];
}

export function EntryTypeIndicator(props: iEntryTypeIndicator) {
  const { tags } = props;

  if (!tags) {
    return <IconMinus class={ICON_STANDARD} />;
  } else if (tags.includes('permanent')) {
    return <IconAsteriskSimple class={ICON_STANDARD} />;
  } else if (tags.includes('event')) {
    return <IconCircle class={ICON_STANDARD} />;
  } else if (tags.includes('task') && !tags.includes('done')) {
    return <IconSquare class={ICON_STANDARD} />;
  } else if (tags.includes('task') && tags.includes('done')) {
    return <IconCheckbox class={ICON_STANDARD} />;
  } else {
    return <IconMinus class={ICON_STANDARD} />;
  }
}

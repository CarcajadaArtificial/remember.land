import { Layout, Link, Navigation, Text } from 'lunchbox';
import { DateTime, datetime, diffInDays } from 'ptera';
import { JSX } from 'preact';

export interface iNavigation {
  today?: DateTime;
  currentPage?: 'home' | 'archive' | 'tags' | 'other';
}

const LinkOrNot = (
  props: { isLink: boolean; text: string; href: string },
): JSX.Element =>
  props.isLink
    ? <Link href={props.href}>{props.text}</Link>
    : <Text>{props.text}</Text>;

export default function (props: iNavigation) {
  const { today, currentPage } = props;

  return (
    <Navigation>
      <Layout dashboard type='focus'>
        <div class='flex gap-6 px-3'>
          <div class='flex-1'>
            <LinkOrNot
              isLink={currentPage !== 'home'}
              text={today ? today.format('MMM d') : 'Home'}
              href='./'
            />
          </div>
          <LinkOrNot
            isLink={currentPage !== 'archive'}
            href='/archive'
            text='Archive'
          />
          <LinkOrNot isLink={currentPage !== 'tags'} href='/tags' text='Tags' />
        </div>
      </Layout>
    </Navigation>
  );
}

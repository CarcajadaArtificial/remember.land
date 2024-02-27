import { ComponentChildren, JSX } from 'preact';
import { Footer, Layout, Link, Main, Navigation, Text } from 'lunchbox';
import { datetime } from 'ptera';

interface iPage {
  children: ComponentChildren;
  currentPage?: 'home' | 'archive' | 'tags' | 'other';
}

const LinkOrNot = (
  props: { isLink: boolean; text: string; href: string },
): JSX.Element =>
  props.isLink
    ? <Link href={props.href}>{props.text}</Link>
    : <Text>{props.text}</Text>;

export default function Page(props: iPage) {
  const { children, currentPage } = props;
  return (
    <>
      <Navigation>
        <Layout dashboard type='focus'>
          <div class='flex gap-6 px-3'>
            <div class='flex-1'>
              <LinkOrNot
                isLink={currentPage !== 'home'}
                text={datetime().format('MMM d')}
                href='./'
              />
            </div>
            <LinkOrNot
              isLink={currentPage !== 'archive'}
              href='/archive'
              text='Archive'
            />
            <LinkOrNot
              isLink={currentPage !== 'tags'}
              href='/tags'
              text='Tags'
            />
          </div>
        </Layout>
      </Navigation>
      <Main class='min-h-screen mt-10 flex flex-col gap-9'>
        {children}
      </Main>
      <Footer layout_type='right'>
        <Text noMargins>v0.1.47</Text>
        <Link href='/signout'>SignOut</Link>
      </Footer>
    </>
  );
}

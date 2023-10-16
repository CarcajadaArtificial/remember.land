import { Footer, Link, Text } from 'lunchbox';

export default function () {
  return (
    <Footer layout_type='right'>
      <Text noMargins>v0.1.30</Text>
      <Link href='/signout'>SignOut</Link>
    </Footer>
  );
}

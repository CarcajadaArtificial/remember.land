import { Header, Layout, Text } from 'lunchbox';
import AuthButton from '@/components/AuthButton/index.tsx';
// import { Handlers, PageProps } from '$fresh/server.ts';
// import { redirect } from 'redirect';
// import { WithSession } from 'fresh_session';
// import { setupApp } from 'db/index.ts';
// import 'std/dotenv/load.ts';

export default function Signin() {
  return (
    <Header banner>
      <Layout>
        <Text type='heading'>Sign In</Text>
      </Layout>
      <Layout class='pb-24' type='thirds'>
        <AuthButton provider='GitHub' />
        <AuthButton provider='Google' />
        <AuthButton provider='Auth0' />
      </Layout>
    </Header>
  );
}

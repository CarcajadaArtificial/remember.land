import { Header, Layout, Main, Text } from 'lunchbox';
// import { ContributionCalendar } from "../components/ContributionCalendar/index.tsx";
import { InputNote } from '../islands/InputNote/index.tsx';

export default function Home() {
  return (
    <div>
      <Header layout_type='full'>
        <Text type='display'>Home</Text>
      </Header>
      <Main>
        <Layout type='full'>
          <InputNote />
        </Layout>
      </Main>
    </div>
  );
}

import { Main, Text } from "lunchbox";
// import { ContributionCalendar } from "../components/ContributionCalendar/index.tsx";
import { InputNote } from "../islands/InputNote/index.tsx";

export default function Home() {
  return (
    <Main layout_type="center">
      <Text type="heading">Input Note</Text>
      <InputNote />
    </Main>
  );
}

import { ContributionLevel } from '../index.tsx';

interface iContributionCalendarBlock {
  level: ContributionLevel;
  dateUtc?: string;
}

export function ContributionCalendarBlock(
  props: iContributionCalendarBlock,
) {
  const { level, dateUtc } = props;

  return (
    <div
      class={level === null
        ? 'comp-contributionCalendar-block'
        : `comp-contributionCalendar-block comp-contributionCalendar-block_${level}`}
      title={dateUtc}
    />
  );
}

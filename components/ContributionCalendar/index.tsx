import { JSX } from 'preact';
import { datetime, diffInDays } from 'ptera';
import { forEachInN, isLastDayOfMonth } from 'utils';
import { Text } from 'lunchbox';
import { ContributionCalendarBlock } from './components/ContributionCalendarBlock.tsx';

export type ContributionLevel = null | 'none' | 'low' | 'mid' | 'high';

interface iContributionCalendar {
  startDateUtc: string;
  endDateUtc: string;
  contributionMap: Record<string, ContributionLevel>;
}

export function ContributionCalendar(props: iContributionCalendar) {
  const startDateTime = datetime(new Date(props.startDateUtc));
  const endDateTime = datetime(new Date(props.endDateUtc));
  const dayDifference = diffInDays(startDateTime, datetime(endDateTime)) + 1;

  const currentWeek: JSX.Element[] = [];
  const currentMonth: JSX.Element[] = [];
  const monthsOfContribution: JSX.Element[] = [];

  forEachInN(dayDifference, (i) => {
    const blockDate = startDateTime.add({ day: i });
    const blockDateTime = datetime(blockDate);
    const isEndOfMonth = isLastDayOfMonth(blockDate);
    const isEndDate = i === dayDifference - 1;
    const contributions = props.contributionMap[blockDateTime.toISODate()];

    if (i === 0 || blockDateTime.day === 1) {
      currentWeek.push(
        ...Array(datetime(blockDate).weekDay()).fill(
          <ContributionCalendarBlock level={null} />,
        ),
      );
    }

    currentWeek.push(
      <ContributionCalendarBlock
        level={contributions ? contributions : 'none'}
        dateUtc={blockDateTime.format('www, d MMM YYYY')}
      />,
    );

    if (currentWeek.length === 7 || isEndOfMonth || isEndDate) {
      currentMonth.push(
        <div class='comp-contributionCalendar-week'>{...currentWeek}</div>,
      );
      currentWeek.length = 0;
    }

    if (isEndOfMonth || isEndDate) {
      monthsOfContribution.push(
        <div class='comp-contributionCalendar-calendar_module'>
          <Text class='text-center mb-1.5'>{blockDateTime.format('MMM')}</Text>
          <div class='comp-contributionCalendar-month'>{...currentMonth}</div>
        </div>,
      );
      currentMonth.length = 0;
    }
  });

  return (
    <div class='comp-contributionCalendar'>
      <div class='comp-contributionCalendar-calendar'>
        {...monthsOfContribution}
      </div>
    </div>
  );
}

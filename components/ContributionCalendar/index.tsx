import { JSX } from 'preact';
import { datetime, diffInDays } from 'ptera';
import { forEachInN, isLastDayOfMonth } from 'utils';
import { Text } from 'lunchbox';

interface iContributionCalendar {
  startDateUtc: string;
  endDateUtc: string;
}

const contributionCalendarBlock = (
  level: null | 'none' | 'low' | 'mid' | 'high',
  dateUtc: string,
) => (
  <div
    class={level === null
      ? 'comp-contributionCalendar-block'
      : `comp-contributionCalendar-block comp-contributionCalendar-block_${level}`}
    title={dateUtc}
  />
);

export function ContributionCalendar(props: iContributionCalendar) {
  const startDate = new Date(props.startDateUtc);
  const endDate = new Date(props.endDateUtc);
  const dayDifference = diffInDays(datetime(startDate), datetime(endDate));

  const currentWeek: JSX.Element[] = [];
  const currentMonth: JSX.Element[] = [];
  const monthsOfContribution: JSX.Element[] = [];

  forEachInN(dayDifference, (i) => {
    const blockDate = new Date(startDate.setDate(startDate.getDate() + 1));
    const blockDateTime = datetime(blockDate);

    const isStartOfMonth = blockDate.getDate() === 1;
    const isStartDate = i === 0;

    if (isStartDate || isStartOfMonth) {
      forEachInN(datetime(blockDate).weekDay(), () => {
        currentWeek.push(contributionCalendarBlock(null, 'blank'));
      });
    }

    currentWeek.push(
      contributionCalendarBlock('none', blockDate.toUTCString()),
    );

    const isEndOfWeek = currentWeek.length === 7;
    const isEndOfMonth = isLastDayOfMonth(blockDate);
    const isEndDate = i === dayDifference - 1;

    if (isEndOfWeek || isEndOfMonth || isEndDate) {
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

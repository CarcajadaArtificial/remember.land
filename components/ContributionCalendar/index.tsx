import { difference, format } from 'datetime';

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

const WEEKDAYS = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];

interface iContributionCalendar {
  test?: string;
}

function groupContributionsByMonth(startDate: Date, endDate: Date) {
  const days: { [key: string]: string[] } = {};

  const diff = difference(startDate, endDate, { units: ['days'] }).days;

  for (let i = 0; i < (diff ? diff : 0); i++) {
    const currentDate = new Date(startDate.setDate(startDate.getDate() + 1));
    const groupKey = `${MONTHS[currentDate.getMonth()]}${
      format(currentDate, 'yy')
    }`;
    if (!days[groupKey]) {
      days[groupKey] = [];
    }
    days[groupKey].push(format(currentDate, 'dd-MM-yy'));
  }

  return days;
}

export function ContributionCalendar(props: iContributionCalendar) {
  const today = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);
  console.log(groupContributionsByMonth(yearAgo, today));
  // console.log(typeof today.getFullYear());
  return <div />;
}

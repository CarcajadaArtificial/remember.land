import { useEffect, useState } from 'preact/hooks';
import { Entry } from '../Entry/index.tsx';
import { iQueryEntries, LargeKvEntry } from 'db/entry.ts';
import { updateEntryList } from 'signals';
import { bring } from 'utils';
import { type findReq } from 'api/entries/get.ts';
import { Document } from 'kvdex';
import { Layout } from 'lunchbox';
import {
  ContributionCalendar,
  ContributionLevel,
} from 'components/ContributionCalendar/index.tsx';
import { datetime } from 'ptera';

export interface iEntryList {
  query: iQueryEntries;
  contributionCalendar?: boolean;
}

function entriesToContributions(entries: Document<LargeKvEntry>[]) {
  const contributionCountMap: Record<string, number> = {};
  entries.forEach((entry) => {
    const entryDateTime = datetime(new Date(entry.value.utc_created_at));
    if (contributionCountMap[entryDateTime.toISODate()] >= 1) {
      contributionCountMap[entryDateTime.toISODate()]++;
    } else {
      contributionCountMap[entryDateTime.toISODate()] = 1;
    }
  });
  const contributionMap: Record<string, ContributionLevel> = {};
  Object.keys(contributionCountMap).forEach((contributionIsoDate) => {
    const contribution = contributionCountMap[contributionIsoDate];
    if (contribution === 0) {
      contributionMap[contributionIsoDate] = 'none';
    } else if (contribution <= 5) {
      contributionMap[contributionIsoDate] = 'low';
    } else if (contribution <= 10) {
      contributionMap[contributionIsoDate] = 'mid';
    } else {
      contributionMap[contributionIsoDate] = 'high';
    }
  });
  return contributionMap;
}

export function EntryList(props: iEntryList) {
  const [entries, setEntries] = useState<Document<LargeKvEntry>[]>([]);
  const [firstEntry, setFirstEntry] = useState<Document<LargeKvEntry>>();

  useEffect(() => {
    bring<findReq, Document<LargeKvEntry>[]>('/api/entries/get', 'POST', {
      query: props.query,
    }, 'Find entries error.')
      .then((res) => {
        if (res) {
          setEntries(res);
          setFirstEntry(res.reduce((earliest, current) => {
            const earliestDate = new Date(earliest.value.utc_created_at);
            const currentDate = new Date(current.value.utc_created_at);
            return currentDate < earliestDate ? current : earliest;
          }, res[0]));
        }
      });
  }, [updateEntryList.value]);

  if (
    entries.length === 0 || firstEntry === undefined ||
    !firstEntry.value.utc_created_at === undefined
  ) {
    return <></>;
  }

  return (
    <Layout dashboard type='left'>
      <div class='grid gap-1.5'>
        {entries.map((entry) => <Entry entry={entry} />)}
      </div>
      <div>
        {props.contributionCalendar
          ? (
            <ContributionCalendar
              contributionMap={entriesToContributions(entries)}
              startDateUtc={firstEntry.value.utc_created_at}
              endDateUtc={new Date().toUTCString()}
            />
          )
          : <></>}
      </div>
    </Layout>
  );
}

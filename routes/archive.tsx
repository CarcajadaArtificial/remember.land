import { Link, Navigation } from 'lunchbox';
import { datetime } from 'ptera';
import { EntryQuery } from '../islands/EntryQuery/index.tsx';

export default function Archive() {
  const today = datetime(new Date(), { timezone: 'America/Mexico_City' });

  return (
    <div>
      <Navigation class='py-3'>
        <Link href='./'>{today.format('MMMM-dd')}</Link>
      </Navigation>
      <EntryQuery />
    </div>
  );
}

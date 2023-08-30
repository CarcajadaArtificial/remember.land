import { type Handlers } from '$fresh/server.ts';
import { iEntry, insertEntry } from 'db/entry.ts';
import { WithSession } from 'fresh_session';
import { getAppConfiguration } from 'setup';
import { datetime, diffInDays } from 'ptera';

type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async POST(req, ctx) {
    if (!ctx.state.session.get('isSignedIn')) {
      return new Response(JSON.stringify({}));
    }
    const entry = (await req.json()) as iEntry;

    const appConfig = await getAppConfiguration();
    const startingDate = datetime(new Date(appConfig.startingUtcDate));

    entry.day_count = diffInDays(startingDate, datetime());

    const insertedEntry = await insertEntry(entry);
    return new Response(JSON.stringify(insertedEntry));
  },
};

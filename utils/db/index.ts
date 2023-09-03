import { kvdex, KvObject, largeCollection } from 'kvdex';
import { LargeKvEntry } from 'db/entry.ts';
import { adjustToLastHour } from 'utils';

export const kv = await Deno.openKv();

export const db = kvdex(kv, {
  entries: largeCollection<LargeKvEntry>().build(),
});

export interface iApp {
  startingUtcDate: string;
}

export interface KvApp extends KvObject {
  startingUtcDate: string;
}

export const setupApp = async () => {
  const app = await kv.get<KvApp>(['app']);
  if (app.value) {
    return;
  }
  await kv.set(['app'], {
    startingUtcDate: adjustToLastHour(new Date(), 6).toUTCString(),
  });
};

export const getApp = async () =>
  (await kv.get<KvApp>(['app'])).value as iApp | null;

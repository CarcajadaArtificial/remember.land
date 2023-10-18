import { dbEntry } from 'db/entry.ts';
import { KvId } from 'kvdex';
import { dbTag } from 'db/tag.ts';

export type iUserEntryTag = {
  // user_id: KvId;
  entry_id: KvId;
  tag_id: KvId;
};

export type iIndexedUserEntryTag = {
  // user: KvId;
  // entries: {
  entry: dbEntry;
  tag: dbTag[];
  // }[]
};

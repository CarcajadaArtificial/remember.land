import { kv } from '@/utils/db/index.ts';

export interface iTag {
  id: string;
  name: string;
}

export interface iQueryTags {
  containsText?: string;
}

export async function createTag(tag: iTag, userId: string) {
  const tagKey = ['users', userId, 'tags', tag.id];

  const atomicOp = kv.atomic()
    .check({ key: tagKey, versionstamp: null })
    .set(tagKey, tag);

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error('Failed to create tag');
}

export function getTags(userId: string) {
  return kv.list<iTag>({ prefix: ['users', userId, 'tags'] });
}

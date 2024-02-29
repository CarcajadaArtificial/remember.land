import { kv } from '@/utils/db/index.ts';
import { iTag } from '@/utils/dto.ts';

/** @todo Write documentation */
export async function createTag(tag: iTag, userId: string) {
  const tagKey = ['users', userId, 'tags', tag.id];

  const atomicOp = kv.atomic()
    .check({ key: tagKey, versionstamp: null })
    .set(tagKey, tag);

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error('Failed to create tag');
}

/** @todo Write documentation */
export function getTags(userId: string) {
  return kv.list<iTag>({ prefix: ['users', userId, 'tags'] });
}

export async function editTag(tag: iTag, userId: string) {
  console.log(tag, userId);
}

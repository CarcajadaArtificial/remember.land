import { LargeKvObject } from 'kvdex';
import { dbItem, docItem } from 'types';
import { db } from './index.ts';

export interface iTag {
  name: string;
  subtags: string[];
}

export type dbTag = dbItem<iTag, string>;

export type docTag = docItem<iTag>;

export interface iQueryTags {
  contains_text?: string;
}

export type LargeKvTag = iTag & LargeKvObject;

export const getAllTags = async () => await db.tags.getMany();

export const getTag = async (id: Deno.KvKeyPart) => await db.tags.find(id);

export const addTag = async (tag: LargeKvTag) => {
  return await db.tags.add(tag);
};
export const deleteTag = async (id: Deno.KvKeyPart) => {
  await db.tags.delete(id);
};
export const updateTag = async (id: Deno.KvKeyPart, tag: LargeKvTag) =>
  await db.tags.update(id, tag);

export const findEntries = async (query: iQueryTags) => {
  return await db.tags.getMany({
    filter: (doc) =>
      !(query.contains_text &&
        doc.value.name.search(query.contains_text) === -1),
  });
};

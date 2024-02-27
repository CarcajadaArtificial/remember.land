export const kv = await Deno.openKv();

export async function kvIteratorToEntryArray<T>(
  kvIterator: Deno.KvListIterator<T>,
): Promise<Deno.KvEntry<T>[]> {
  const kvEntryArray = [];
  for await (const currentValue of kvIterator) {
    kvEntryArray.push(currentValue);
  }
  return kvEntryArray;
}

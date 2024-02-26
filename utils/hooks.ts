import { useState } from 'preact/hooks';
import { iEntry } from '@/utils/db/entry.ts';
import { iTag } from '@/utils/db/tag.ts';

export interface EntryInputState {
  entry: iEntry;
  userTags: iTag[];
  setEntry: (newEntryData: Partial<iEntry>) => void;
  addUserTag: (newTag: iTag) => void;
  updateEntryTags: (idsToAdd: string[], idsToRemove: string[]) => void;
}

export function createEntryInputState(
  userTags: iTag[],
  entry: iEntry,
): EntryInputState {
  const [stateEntry, setstateEntry] = useState<iEntry>(entry);
  const [stateUserTags, setstateUserTags] = useState<iTag[]>(
    userTags,
  );

  const updateEntry = (newEntryData: Partial<iEntry>) =>
    setstateEntry({ ...stateEntry, ...newEntryData });

  const addUserTag = (newTag: iTag) =>
    setstateUserTags([...stateUserTags, newTag]);

  const updateEntryTags = (idsToAdd: string[], idsToRemove: string[]) => {
    const tagsRemoved = stateEntry.tagIds.filter((tag) =>
      !idsToRemove.includes(tag)
    );
    const tagsAdded = tagsRemoved.concat(
      idsToAdd.filter((potentialDuplicateTag) =>
        tagsRemoved.indexOf(potentialDuplicateTag) < 0
      ),
    );
    updateEntry({ tagIds: tagsAdded });
  };

  return {
    entry: stateEntry,
    userTags: stateUserTags,
    setEntry: updateEntry,
    updateEntryTags,
    addUserTag,
  };
}

import { useState } from 'preact/hooks';

/**
 * This custom hook makes interacting with a list of tags much easier. Instead of having to interact directly with `setTags()` by passing it a new array every time, `updateTags()` gives an quick way to add and remove tags with a single function call.
 */
export const useTagList: (def_value: string[]) => [
  tags: string[],
  updateTags: (tagsToAdd: string[], tagsToRemove: string[]) => void,
] = (def_value: string[]) => {
  const [tags, setTags] = useState<string[]>(def_value);

  const updateTags = (tagsToAdd: string[], tagsToRemove: string[]) => {
    const tagsRemoved = tags.filter((tag) => !tagsToRemove.includes(tag));
    const tagsAdded = tagsRemoved.concat(
      tagsToAdd.filter((potentialDuplicateTag) =>
        tagsRemoved.indexOf(potentialDuplicateTag) < 0
      ),
    );
    setTags(tagsAdded);
  };

  return [tags, updateTags];
};

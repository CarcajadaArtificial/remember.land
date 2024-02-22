export interface iEntry {
  createdAtUTC: string;
  content: string;
  tagIds: string[];
  mark: string;
  dayCount: number;
}

export interface iQueryEntries {
  containsText?: string;
  createdOnDayCount?: number;
  createdBeforeDayCount?: number;
  createdAfterDayCount?: number;
  includesTags?: string[];
  excludesTags?: string[];
  // include_all_tags: boolean
}

// export const SortEntriesBy = {
//   content_alphabetically: (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
//     asc
//       ? a.value.content.localeCompare(b.value.content)
//       : a.value.content.localeCompare(b.value.content) * -1,

//   content_byLength: (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
//     asc
//       ? a.value.content.length - b.value.content.length
//       : b.value.content.length - a.value.content.length,

//   entryMark_alphabetically:
//     (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
//       asc
//         ? a.value.entry_mark.localeCompare(b.value.entry_mark)
//         : a.value.entry_mark.localeCompare(b.value.entry_mark) * -1,

//   entry_mark_byLength: (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
//     asc
//       ? a.value.entry_mark.length - b.value.entry_mark.length
//       : b.value.entry_mark.length - a.value.entry_mark.length,

//   day_count: (asc: boolean) => (a: dbEntry, b: dbEntry): number =>
//     asc
//       ? a.value.day_count - b.value.day_count
//       : b.value.day_count - a.value.day_count,
// };

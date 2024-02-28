import { z } from 'zod';

export const TagDTO = z.object({
  id: z.string(),
  name: z.string(),
});

export type iTag = z.infer<typeof TagDTO>;

export const EntryDTO = z.object({
  id: z.string(),
  createdAtUTC: z.string(),
  content: z.string(),
  tagIds: z.array(z.string()),
  mark: z.string(),
  dayCount: z.number(),
});

export type iEntry = z.infer<typeof EntryDTO>;

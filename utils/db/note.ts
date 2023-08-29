export interface iEntry {
  id: number;
  created_at: Date;
  content: string;
  tags: string[];
  entry_mark: string;
  // north_ids: number[];
  // south_ids: number[];
  // west_ids: number[];
  // east_ids: number[];
}

export const def_Note: iEntry = {
  id: -1,
  created_at: new Date(),
  content: '',
  tags: [],
  entry_mark: '',
};

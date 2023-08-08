export interface iNote {
  id: number;
  created_at: Date;
  content: string;
  north_ids: number[];
  south_ids: number[];
  west_ids: number[];
  east_ids: number[];
  tags: string[];
  reference: string;
}

export interface Note {
  _id: string;
  title?: string;
  content: string;
  tags?: string[];
  isLocked: boolean;
  file?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  notes: Note[];
}
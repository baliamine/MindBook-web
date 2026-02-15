export interface Note {
  _id: string;
  user: string;
  title: string;
  content: string;
  tags: string[];
  isLocked: boolean;
  password?: string;
  file?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  success: boolean;
  notes: Note[];
  message?: string;
}

export interface UnlockNoteData {
  noteId: string;
  password: string;
}

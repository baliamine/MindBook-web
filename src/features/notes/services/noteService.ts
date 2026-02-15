import api from "@/lib/api";
import { getToken } from "@/lib/authStorage";
import { NotesResponse } from "@/types/note";

export const getAllNotes = async (): Promise<NotesResponse> => {
  const token = getToken();
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.get("/note/all-notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const unlockNote = async (noteId: string, password: string) => {
  const token = getToken();
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await api.post(
    `/note/unlock/${noteId}`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

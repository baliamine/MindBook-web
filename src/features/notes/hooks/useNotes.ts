"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../services/noteService";
import { NotesResponse } from "../../../types/note";

export const useNotes = (page = 1, limit = 10, search = "") => {
  return useQuery<NotesResponse>({
    queryKey: ["notes", page, limit, search],
    queryFn: () => getAllNotes(page, limit, search),
  });
};

import api from "@/lib/api";

export const getAllNotes = async (page = 1, limit = 10, search = "") => {
  const response = await api.get("/note/all-notes", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};
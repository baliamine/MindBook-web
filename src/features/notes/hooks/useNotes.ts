import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../services/noteService";
import { isAuthenticated } from "@/lib/authStorage";

export const useNotes = () => {
  const isAuth = isAuthenticated();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
    enabled: isAuth, // Only fetch if authenticated
  });

  return {
    notes: data?.notes || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

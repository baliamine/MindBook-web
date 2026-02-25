import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "../services/authService";
import { saveToken, saveUser, logout as clearAuth, getUser, getToken } from "@/lib/authStorage";
import { SignupFormData, User, AuthResponse } from "@/types/auth";

const AUTH_QUERY_KEY = ["auth", "user"];

/**
 * useAuthUser - Query for current authenticated user
 * Reads from localStorage and validates token
 */
export const useAuthUser = () => {
  return useQuery<User | null, Error>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      // ✅ FIX: Actually get the user from storage
      const token = getToken();
      if (!token) {
        return null; // No token = no user
      }
      
      const user = getUser();
      return user || null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes (shorter is better)
    gcTime: 60 * 60 * 1000, // 1 hour
    // ✅ Add these options for better UX
    refetchOnMount: true,
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};

/**
 * useLogin - Mutation for user login
 */
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      if (data.accessToken) {
        saveToken(data.accessToken);
      }
      if (data.user) {
        saveUser(data.user);
        // ✅ FIX: Update cache with actual user data
        queryClient.setQueryData(AUTH_QUERY_KEY, data.user);
      }
      router.push("/notes");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};

/**
 * useSignup - Mutation for user registration
 */
export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, SignupFormData>({
    mutationFn: (data) => signupUser(data),
    onSuccess: () => {
      // ✅ Clear cache
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
      router.push("/login?registered=true");
    },
    onError: (error) => {
      console.error("Signup error:", error.message);
    },
  });
};

/**
 * useLogout - Mutation for user logout
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      clearAuth();
    },
    onSuccess: () => {
      // ✅ Clear cache and reset to null
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
      router.push("/");
    },
  });
};

/**
 * useAuth - Combined auth hook with React Query
 */
export const useAuth = () => {
  const { data: user, isLoading: isUserLoading } = useAuthUser();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  return {
    user, // ✅ Now this actually contains the user!
    isLoading: isUserLoading || loginMutation.isPending || signupMutation.isPending,
    login: (email: string, password: string) =>
      loginMutation.mutateAsync({ email, password }),
    signup: (data: SignupFormData) => signupMutation.mutateAsync(data),
    logout: () => logoutMutation.mutate(),
    error: loginMutation.error?.message || signupMutation.error?.message || null,
    isLoggingOut: logoutMutation.isPending,
  };
};
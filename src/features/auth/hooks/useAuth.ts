import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "../services/authService";
import { saveToken, saveUser, logout as clearAuth, getUser } from "@/lib/authStorage";
import { SignupFormData, User } from "@/types/auth";

export const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser({ email, password });

      if (res.accessToken) {
        saveToken(res.accessToken);
        if (res.user) saveUser(res.user);
        router.push("/notes"); // redirect after login
      }

      return res;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signupUser(data);

      if (res.accessToken) {
        saveToken(res.accessToken);
        if (res.user) saveUser(res.user);
        router.push("/notes"); // redirect after signup
      }

      return res;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    router.push("/login");
  };

  const getCurrentUser = (): User | null => getUser();

  return { login, signup, logout, error, loading, getCurrentUser };
};

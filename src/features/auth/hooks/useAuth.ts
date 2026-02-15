import { useState } from "react";
import { loginUser, signupUser } from "../services/authService";
import { saveToken } from "@/lib/authStorage";
import { SignupFormData } from "@/types/auth";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser({ email, password });
      if (data.token) {
        saveToken(data.token);
      }
      return data;
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
      const result = await signupUser({
        username: data.username,
        email: data.email,
        password: data.password,
  
      });
      if (result.token) {
        saveToken(result.token);
      }
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, error, loading };
};

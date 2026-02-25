import { User } from "@/types/auth";

/**
 * Token Management - Synced to localStorage and cookies
 */
export const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    // Also save to cookie for server-side validation
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
  }
};

/**
 * User Data Management
 */
export const saveUser = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
    // Store stringified user in cookie as well
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${7 * 24 * 60 * 60}`;
  }
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("user");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const clearUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    document.cookie = "user=; path=/; max-age=0";
  }
};

/**
 * Authentication State
 */
export const isAuthenticated = (): boolean => !!getToken();

export const logout = () => {
  clearToken();
  clearUser();
};

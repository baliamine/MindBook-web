import { User } from "@/types/auth";


export const saveToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const clearToken = () => localStorage.removeItem("token");


export const saveUser = (user: User) => localStorage.setItem("user", JSON.stringify(user));
export const getUser = (): User | null => {
  const data = localStorage.getItem("user");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};
export const clearUser = () => localStorage.removeItem("user");


export const isAuthenticated = () => !!getToken();
export const logout = () => {
  clearToken();
  clearUser();
};

import api from "@/lib/api";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/user/login", data);
  return res.data;
};

export const signupUser = async (data: {
  username: string;
  email: string;
  password: string;


}) => {
  const res = await api.post("/user/register", data);
  return res.data;
};

import api from '@/lib/axios';
import { SignupFormData,LoginFormData } from '@/types/auth';

export const AuthService = {
  signup: async (data: SignupFormData) => {
    const response = await api.post('/user/register', data);
    return response.data;
  },
  
  login: async (data: LoginFormData) => {
    const response = await api.post('/user/login', data);
    return response.data;
  },
};

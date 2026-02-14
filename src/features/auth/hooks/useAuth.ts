import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../services/authApi';
import { LoginFormData, SignupFormData } from '@/types/auth'; // Ensure types are correct

export const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginFormData) => {
        setLoading(true);
        setError(null);
        try {
            await AuthService.login(data);
            // router.push('/dashboard'); // Uncomment when dashboard exists
        } catch (err: any) {
             const message = err.response?.data?.message || "Invalid credentials. Please try again.";
             setError(message);
             throw err; // Re-throw to let component handle if needed
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data: SignupFormData) => {
        setLoading(true);
        setError(null);
        try {
            await AuthService.signup(data);
            router.push('/login');
        } catch (err: any) {
            const message = err.response?.data?.message || "Something went wrong. Please try again.";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { login, signup, loading, error };
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

import { LoginSchema, LoginFormData } from "@/types/auth";
import { AuthService } from "../services/auth.service";
import { InputField } from "@/components/ui/atoms/InputField";
import { AuthCard } from "./AuthCard";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.login(data);
      // router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <>
      Don't have an account?{" "}
      <Link
        href="/signup"
        className="text-indigo-600 font-medium hover:underline"
      >
        Sign up
      </Link>
    </>
  );

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={footer}
    >
      {/* Global Error Alert */}
      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        <InputField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full 
            py-2.5 sm:py-3
            px-4 
            bg-gradient-to-r 
            from-blue-600 to-indigo-600 
            text-white 
            font-semibold 
            rounded-lg 
            shadow-lg 
            hover:shadow-indigo-500/30 
            hover:-translate-y-0.5 
            transition-all 
            disabled:opacity-70 
            flex 
            justify-center 
            items-center
          "
        >
          {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}

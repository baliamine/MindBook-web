"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { LoginSchema, LoginFormData } from "@/types/auth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { AuthCard } from "./AuthCard";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login, loading, error: authError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (err) {
      // Error handled by hook
    }
  };

  const footer = (
    <>
      Don't have an account?{" "}
      <Link
        href="/signup"
        className="text-[#36656B] font-medium hover:underline"
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
      {authError && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={16} />
          <span>{authError}</span>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Submit Button */}
        <Button type="submit" isLoading={loading}>
          Sign In
        </Button>
      </form>
    </AuthCard>
  );
}

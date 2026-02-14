"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { SignupSchema, SignupFormData } from "@/types/auth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { AuthCard } from "./AuthCard";
import { useAuth } from "../hooks/useAuth";

export default function SignupForm() {
  const { signup, loading, error: authError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
    } catch (err) {
      // Error handled by hook
    }
  };

  const footer = (
    <>
      Already have an account?{" "}
      <Link
        href="/login"
        className="text-[#36656B] font-medium hover:underline"
      >
        Log in
      </Link>
    </>
  );

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join MindBook today"
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
          label="Full Name"
          type="text"
          placeholder="John Doe "
          error={errors.username?.message}
          {...register("username")}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1234567890"
          error={errors.phone?.message}
          {...register("phone")}
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
          Sign Up
        </Button>
      </form>
    </AuthCard>
  );
}

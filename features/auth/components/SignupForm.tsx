"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

import { SignupSchema, SignupFormData } from "@/types/auth";
import { AuthService } from "../services/auth.service";
import { InputField } from "@/components/ui/atoms/InputField";
import { AuthCard } from "./AuthCard";

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.signup(data);
      router.push("/login");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <>
      Already have an account?{" "}
      <Link
        href="/login"
        className="text-indigo-600 font-medium hover:underline"
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
          label="Full Name"
          type="text"
          placeholder="John Doe "
          error={errors.username?.message}
          {...register("username")}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+1234567890"
          error={errors.phone?.message}
          {...register("phone")}
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
          {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </button>
      </form>
    </AuthCard>
  );
}

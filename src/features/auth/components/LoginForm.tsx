"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useLogin } from "../hooks/useAuth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { AuthCard } from "./AuthCard";

export default function LoginForm() {
  const { mutateAsync: login, isPending: loading, error } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login({ email, password });
      // Redirect is handled by the mutation
    } catch (err) {
      // Error is handled by the mutation and displayed below
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
      subtitle="Login to your MindBook account"
      footer={footer}
    >
      {/* Success Alert - Show after registration */}
      {isRegistered && (
        <div className="mb-4 p-3 sm:p-4 bg-green-50 text-green-600 rounded-lg flex items-center gap-2 text-sm border border-green-100">
          <CheckCircle size={16} />
          <span>Registration successful! Please login with your credentials.</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={16} />
          <span>{error.message || "Login failed"}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors({ ...errors, email: undefined });
            }
          }}
          error={errors.email}
          disabled={loading}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors({ ...errors, password: undefined });
            }
          }}
          error={errors.password}
          disabled={loading}
        />

        {/* Submit Button */}
        <Button type="submit" isLoading={loading} disabled={loading}>
          Login
        </Button>
      </form>
    </AuthCard>
  );
}


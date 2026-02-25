"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useSignup } from "../hooks/useAuth";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { AuthCard } from "./AuthCard";

export default function SignupForm() {
  const { mutateAsync: signup, isPending: loading, error } = useSignup();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;

  }>({});

  const validateForm = () => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
   
    } = {};

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

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
      await signup({
        username,
        email,
        password,
      });
      // Redirect to /login?registered=true is handled by the mutation
    } catch (err) {
      // Error is handled by the mutation and displayed below
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
      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={16} />
          <span>{error.message || "Signup failed"}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <Input
          label="Username"
          type="text"
          placeholder="amine123"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) {
              setErrors({ ...errors, username: undefined });
            }
          }}
          error={errors.username}
          disabled={loading}
        />

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
          Sign Up
        </Button>
      </form>
    </AuthCard>
  );
}

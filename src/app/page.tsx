"use client";

import Link from "next/link";
import { getUser } from "@/lib/authStorage";

export default function Home() {
  const user = getUser();
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#36656B] to-[#2a4e53]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Welcome to MindBook
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Your personal space to capture thoughts, build ideas, and grow every
            day.
          </p>

          {isAuthenticated ? (
            <>
              <p className="text-lg mb-6 text-gray-100">
                Welcome back, <strong>{user.username}</strong>!
              </p>
              <Link
                href="/notes"
                className="inline-block bg-white text-[#36656B] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Go to Your Notes
              </Link>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-block bg-white text-[#36656B] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-100">
              Your notes are encrypted and stored securely
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Simple</h3>
            <p className="text-gray-100">
              Easy-to-use interface for capturing your ideas
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-white">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Personal</h3>
            <p className="text-gray-100">
              Your own private space for thoughts and creativity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-bold text-[#36656B] group-hover:text-[#2a4e53] transition-colors">
                MindBook
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/")
                  ? "bg-[#36656B]/10 text-[#36656B]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/login"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/login")
                  ? "bg-[#36656B]/10 text-[#36656B]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/signup")
                  ? "bg-[#36656B] text-white shadow-lg"
                  : "bg-[#36656B] text-white hover:bg-[#2a4e53] shadow-md hover:shadow-lg"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

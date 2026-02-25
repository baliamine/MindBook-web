"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut, ChevronDown } from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { getUser } from "@/lib/authStorage";

export const Navbar = () => {
  const pathname = usePathname();
  const { mutate: logout } = useLogout();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = getUser();
  const isAuthenticated = !!user;

  // Hide navbar on login and signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#36656B]">
                MindBook
              </span>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#36656B] flex items-center justify-center text-white text-sm font-semibold">
                      {user.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                      {user.username}
                    </span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Link to notes when on home */}
                {pathname === "/" && (
                  <Link
                    href="/notes"
                    className="bg-[#36656B] text-white hover:bg-[#2a4e53] px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Go to Notes
                  </Link>
                )}
              </>
            ) : (
              <>
                {/* Login/Signup buttons for unauthenticated users (only on home page) */}
                {pathname === "/" && (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-[#36656B] text-white hover:bg-[#2a4e53] px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


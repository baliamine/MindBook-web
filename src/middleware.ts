import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/notes", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = !!token;

  // Redirect unauthenticated users from protected routes
  if (
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from login/signup
  if (
    (pathname === "/login" || pathname === "/signup") &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
import { NextRequest, NextResponse } from "next/server";

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/login", "/signup"];

// Routes that require authentication
const PROTECTED_ROUTES = ["/notes", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies (set by our auth service)
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = !!token;

  /**
   * RULE 1: Redirect unauthenticated users away from protected routes
   */
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  /**
   * RULE 2: Redirect authenticated users away from auth pages
   * (Authenticated users trying to access /login or /signup should go to /notes)
   */
  if ((pathname === "/login" || pathname === "/signup") && isAuthenticated) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};

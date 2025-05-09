import { clerkMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function will run before each request
export default function middleware(req: NextRequest) {
  // Check if the request is for a protected route
  const protectedPaths = ["/quiz/create", "/profile"];
  const path = req.nextUrl.pathname;
  
  // Use a clerk instance to get auth state
  const { userId } = clerkMiddleware().getAuth(req);
  
  // If path is protected and user isn't signed in, redirect to sign-in
  if (protectedPaths.some(protectedPath => path.startsWith(protectedPath)) && !userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
  
  // Continue with the request if authenticated or not a protected route
  return clerkMiddleware()(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}; 
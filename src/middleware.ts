import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function will run before each request
export default function middleware(req: NextRequest) {
  // Check if the request is for a protected route
  const protectedPaths = ["/quiz/create", "/profile"];
  const path = req.nextUrl.pathname;
  
  // Get auth state
  const { userId } = getAuth(req);
  
  // If path is protected and user isn't signed in, redirect to sign-in
  if (protectedPaths.some(protectedPath => path.startsWith(protectedPath)) && !userId) {
    // Create a URL for the sign-in page with a redirect back URL
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    
    // Redirect to the sign-in page
    return NextResponse.redirect(signInUrl);
  }
  
  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}; 
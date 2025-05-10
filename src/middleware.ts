import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define which routes should be protected
// Temporarily commented out for public access
const isProtectedRoute = createRouteMatcher([
  '/quiz/create(.*)', 
  '/profile(.*)', 
  '/dashboard(.*)'
])

// This middleware handles both authentication and PostHog proxying
export default clerkMiddleware(async (auth, req) => {
  // Handle PostHog proxying to avoid ad blockers
  if (req.nextUrl.pathname === '/ingest') {
    const url = new URL('https://eu.posthog.com/capture/', req.url)
    url.searchParams.set('ip', req.ip || '127.0.0.1')
    url.searchParams.set('_', new Date().getTime().toString())

    return NextResponse.rewrite(url)
  }

  // Temporarily allow all routes to be accessed without authentication
  // Comment: Remove this comment and uncomment the line below when ready to restore protection
  // if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Handle PostHog ingestion endpoint
    '/ingest',
  ],
} 
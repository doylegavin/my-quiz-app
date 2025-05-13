import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = createRouteMatcher([
  '/',
  '/sign-in',
  '/sign-up',
  '/api/webhook',
  '/api/generate-questions',
  '/quiz/generated',
  '/exams(.*)',
  // Add other public routes here
])

// Define protected routes that require authentication
const protectedRoutes = createRouteMatcher([
  '/quiz/create(.*)', 
  '/profile(.*)', 
  '/dashboard(.*)'
])

// Clerk middleware for authentication and PostHog proxying
export default clerkMiddleware(async (auth, req) => {
  // Handle PostHog proxying to avoid ad blockers
  if (req.nextUrl.pathname === '/ingest') {
    const url = new URL('https://eu.posthog.com/capture/', req.url)
    url.searchParams.set('ip', req.ip || '127.0.0.1')
    url.searchParams.set('_', new Date().getTime().toString())
    return NextResponse.rewrite(url)
  }

  // Apply route protection only for protected routes
  if (protectedRoutes(req)) {
    // This will redirect to sign-in if the user isn't authenticated
    await auth.protect()
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.png$).*)',
    // Handle PostHog ingestion endpoint
    '/ingest',
  ],
} 
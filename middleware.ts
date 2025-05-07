import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the current URL and host info
  const url = request.nextUrl.clone();
  
  // Handle direct access to callback URLs (fixes Google OAuth)
  if (url.pathname.startsWith('/api/auth/callback')) {
    // Don't process callback URLs, let them go through directly
    return NextResponse.next();
  }
  
  // For NextAuth routes, ensure URLs match the current environment
  if (url.pathname.startsWith('/api/auth') || url.pathname.startsWith('/auth')) {
    // Critical fix: redirect any GET request to /api/auth/signin to the correct page
    if (url.pathname === '/api/auth/signin' && request.method === 'GET') {
      // Preserve any query parameters like callbackUrl
      const params = new URLSearchParams(url.search);
      const redirectUrl = new URL('/auth/signin', url.origin);
      
      // Copy all parameters to the new URL
      params.forEach((value, key) => {
        redirectUrl.searchParams.set(key, value);
      });
      
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/auth/:path*',
    '/auth/:path*'
  ],
}; 
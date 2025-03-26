import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the current URL and host info
  const url = request.nextUrl.clone();
  const currentHost = request.headers.get('host') || 'localhost:3000';
  const currentPort = currentHost.split(':')[1] || '3000';
  
  // Protected routes check - DON'T redirect, let client-side handle auth
  // This allows the overlay modal to work correctly
  if (url.pathname.startsWith('/quiz/create') || 
      url.pathname.startsWith('/profile')) {
    // Instead of redirecting, we'll let the page load and show the auth modal
    // through client-side code in useProtectedPage hook
    const token = await getToken({ req: request });
    
    // For debugging only - log token info
    if (process.env.NODE_ENV === 'development') {
      console.log(`Middleware: ${url.pathname} - Token:`, token ? 'exists' : 'missing');
    }
  }
  
  // For NextAuth routes, ensure URLs match the current port
  if (url.pathname.startsWith('/api/auth')) {
    // Fix callbackUrl parameter if present
    const callbackUrl = url.searchParams.get('callbackUrl');
    if (callbackUrl) {
      try {
        const callbackUrlObj = new URL(callbackUrl.startsWith('http') ? callbackUrl : `http://${currentHost}${callbackUrl}`);
        // If the callback has a different port or no port, update it
        if (!callbackUrlObj.port || callbackUrlObj.port !== currentPort) {
          callbackUrlObj.port = currentPort;
          url.searchParams.set('callbackUrl', callbackUrlObj.toString());
          return NextResponse.redirect(url);
        }
      } catch (e) {
        console.error('Invalid callbackUrl format:', callbackUrl);
      }
    }
    
    // Redirect any GET request to /api/auth/signin to the new route structure
    if (url.pathname === '/api/auth/signin' && request.method === 'GET') {
      // Preserve any query parameters like callbackUrl
      const params = new URLSearchParams(url.search);
      const redirectUrl = new URL('/signin', url.origin);
      
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
    '/quiz/create',
    '/profile',
    '/profile/:path*'
  ],
}; 
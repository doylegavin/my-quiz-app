import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the current URL and host info
  const url = request.nextUrl.clone();
  const currentHost = request.headers.get('host') || 'localhost:3000';
  const isProduction = currentHost.includes('examinaite.ie');
  const isProd = process.env.NODE_ENV === 'production';
  
  // For debugging
  console.log(`Middleware processing: ${url.pathname} on host ${currentHost}, isProd=${isProd}`);
  
  // Handle direct access to callback URLs (fixes Google OAuth)
  if (url.pathname.startsWith('/api/auth/callback')) {
    console.log('Processing OAuth callback URL');
    return NextResponse.next();
  }
  
  // For NextAuth routes, ensure URLs match the current environment
  if (url.pathname.startsWith('/api/auth') || url.pathname.startsWith('/auth')) {
    // Fix callbackUrl parameter if present
    const callbackUrl = url.searchParams.get('callbackUrl');
    if (callbackUrl) {
      try {
        console.log('Fixing callbackUrl:', callbackUrl);
        const callbackUrlObj = new URL(callbackUrl.startsWith('http') ? callbackUrl : `http://${currentHost}${callbackUrl}`);
        
        // In production, make sure we use https and www.examinaite.ie
        if (isProduction && callbackUrlObj.host !== 'www.examinaite.ie') {
          callbackUrlObj.protocol = 'https:';
          callbackUrlObj.host = 'www.examinaite.ie';
          callbackUrlObj.port = '';
          url.searchParams.set('callbackUrl', callbackUrlObj.toString());
          console.log('Redirecting to fixed callbackUrl (production):', callbackUrlObj.toString());
          return NextResponse.redirect(url);
        }
      } catch (e) {
        console.error('Invalid callbackUrl format:', callbackUrl, e);
      }
    }
    
    // Critical fix: redirect any GET request to /api/auth/signin to the correct page
    if (url.pathname === '/api/auth/signin' && request.method === 'GET') {
      // Preserve any query parameters like callbackUrl
      const params = new URLSearchParams(url.search);
      const redirectUrl = new URL('/auth/signin', url.origin);
      
      // Copy all parameters to the new URL
      params.forEach((value, key) => {
        redirectUrl.searchParams.set(key, value);
      });
      
      console.log('Redirecting signin to:', redirectUrl.toString());
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
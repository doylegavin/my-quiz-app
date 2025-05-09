import { createClerkProxyRequestHandler } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

// Set the runtime to edge for optimal performance
export const runtime = 'edge';
 
export const OPTIONS = { 
  debug: process.env.NODE_ENV === 'development',
};
 
export async function GET(req: NextRequest) {
  return createClerkProxyRequestHandler({
    debug: OPTIONS.debug,
  })(req);
}
 
export async function POST(req: NextRequest) {
  return createClerkProxyRequestHandler({
    debug: OPTIONS.debug,
  })(req);
} 
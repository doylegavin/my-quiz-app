import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// This is the handler for all Clerk Frontend API requests
export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  
  try {
    // Forward the request to Clerk's Frontend API
    const response = await fetch(`https://clerk.examinaite.ie${pathname}`, {
      method: 'GET',
      headers: req.headers
    });
    
    // Return the response from Clerk
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  } catch (error) {
    console.error('Clerk proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to Clerk' },
      { status: 500 }
    );
  }
}

// Handle POST requests the same way
export async function POST(req: NextRequest) {
  const { pathname } = new URL(req.url);
  
  try {
    const body = await req.text();
    
    // Forward the request to Clerk's Frontend API
    const response = await fetch(`https://clerk.examinaite.ie${pathname}`, {
      method: 'POST',
      headers: req.headers,
      body
    });
    
    // Return the response from Clerk
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  } catch (error) {
    console.error('Clerk proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to Clerk' },
      { status: 500 }
    );
  }
} 
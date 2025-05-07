import { NextResponse } from "next/server";

// This is a simplified handler for the Google OAuth callback
export async function GET(request: Request) {
  try {
    // Get the URL and query parameters
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    
    if (!code || !state) {
      return new Response("Missing code or state parameter", { status: 400 });
    }
    
    // Redirect to our client-side handler that can manage the OAuth flow
    const redirectUrl = new URL("/auth/google-callback", process.env.NEXTAUTH_URL || "https://www.examinaite.ie");
    
    // Copy all parameters
    url.searchParams.forEach((value, key) => {
      redirectUrl.searchParams.set(key, value);
    });
    
    // Redirect to our client-side handler
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Error in custom Google callback handler:", error);
    return new Response("Authentication error", { status: 500 });
  }
} 
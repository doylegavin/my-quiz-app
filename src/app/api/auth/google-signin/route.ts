import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get the URL to return to after login
    const url = new URL(request.url);
    const callbackUrl = url.searchParams.get("callbackUrl") || "/";
    
    // Google OAuth2 authorization endpoint
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    
    // Construct the authorization URL
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      redirect_uri: `${process.env.NEXTAUTH_URL || "https://www.examinaite.ie"}/api/auth/callback/google`,
      response_type: "code",
      scope: "openid email profile",
      prompt: "consent",
      access_type: "offline",
      state: Buffer.from(callbackUrl).toString("base64"),
    });
    
    // Redirect to Google's authorization page
    return NextResponse.redirect(`${googleAuthUrl}?${params.toString()}`);
  } catch (error) {
    console.error("Error initiating Google sign-in:", error);
    return NextResponse.json({ error: "Failed to initiate sign-in" }, { status: 500 });
  }
} 
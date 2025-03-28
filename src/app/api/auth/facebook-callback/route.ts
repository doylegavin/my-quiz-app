import { NextRequest, NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import prisma from "@/lib/prisma"; // Import the singleton prisma client

// Generate a secure user ID
function generateUserId() {
  return require('crypto').randomUUID();
}

export async function POST(req: NextRequest) {
  try {
    const { accessToken, userID, name, email } = await req.json();
    
    if (!accessToken || !userID || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log(`Facebook login attempt for: ${email}`);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Create new user if they don't exist
      console.log(`Creating new user for: ${email}`);
      user = await prisma.user.create({
        data: {
          id: generateUserId(),
          email,
          name: name || email.split('@')[0],
          emailVerified: new Date(),
        }
      });
    }

    // Create/update Facebook account link
    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: 'facebook',
          providerAccountId: userID
        }
      },
      update: {
        access_token: accessToken,
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        token_type: 'Bearer',
      },
      create: {
        userId: user.id,
        type: 'oauth',
        provider: 'facebook',
        providerAccountId: userID,
        access_token: accessToken,
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        token_type: 'Bearer',
      }
    });

    // Create a session token
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      throw new Error("NEXTAUTH_SECRET is not defined");
    }

    const token = await encode({
      token: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.image || null,
        sub: user.id,
      },
      secret,
    });

    // Set cookie with session token
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "next-auth.session-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Facebook callback error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
} 
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/nextAuth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/user/profile - Get current user profile
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "You must be logged in to access this endpoint" },
      { status: 401 }
    );
  }

  try {
    // Determine how to find the user
    const userWhere = session.user.id 
      ? { id: session.user.id } 
      : session.user.email 
        ? { email: session.user.email }
        : null;

    if (!userWhere) {
      return NextResponse.json(
        { error: "Could not identify user" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: userWhere,
      select: {
        id: true,
        name: true,
        username: true,
        preferredName: true,
        pronouns: true,
        email: true,
        emailVerified: true,
        image: true,
        locale: true,
        timezone: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: "You must be logged in to update your profile" },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    
    // Extract the fields we want to update
    const {
      name,
      username,
      preferredName,
      pronouns,
      locale,
      timezone,
      image,
    } = data;

    // First, find the user to make sure we have their ID
    const userWhere = session.user.id 
      ? { id: session.user.id } 
      : session.user.email 
        ? { email: session.user.email }
        : null;

    if (!userWhere) {
      return NextResponse.json(
        { error: "Could not identify user" },
        { status: 400 }
      );
    }

    // First, get the user to make sure they exist
    const user = await prisma.user.findUnique({
      where: userWhere,
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if username is unique if provided
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json(
          { error: "Username is already taken" },
          { status: 400 }
        );
      }
    }

    // Update user profile with the verified user ID
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        username,
        preferredName,
        pronouns,
        locale,
        timezone,
        image,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        username: true,
        preferredName: true,
        pronouns: true,
        email: true,
        image: true,
        locale: true,
        timezone: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
} 
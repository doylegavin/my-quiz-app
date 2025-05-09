import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// GET /api/user/profile - Get current user profile
export async function GET(request: NextRequest) {
  // Get the user ID from Clerk
  const { userId } = await auth();
  
  // Check if the user is authenticated
  if (!userId) {
    return NextResponse.json(
      { error: "You must be signed in to access this endpoint" },
      { status: 401 }
    );
  }

  try {
    // Fetch the user from the database using their Clerk user ID
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    // If the user doesn't exist in the database yet, create them
    if (!user) {
      return NextResponse.json(
        { user: null, message: "User not found in database" },
        { status: 404 }
      );
    }

    // Return the user data
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching user data" },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: NextRequest) {
  // Get the user ID from Clerk
  const { userId } = await auth();
  
  // Check if the user is authenticated
  if (!userId) {
    return NextResponse.json(
      { error: "You must be signed in to access this endpoint" },
      { status: 401 }
    );
  }

  try {
    // Parse the request body
    const body = await request.json();
    
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    // If the user doesn't exist in our database yet, create them
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          clerkId: userId,
          name: body.name,
          username: body.username,
          preferredName: body.preferredName,
          pronouns: body.pronouns,
          locale: body.locale,
          timezone: body.timezone,
          image: body.image,
        },
      });
      
      return NextResponse.json({ user: newUser });
    }

    // Update the user's profile
    const updatedUser = await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        name: body.name,
        username: body.username,
        preferredName: body.preferredName,
        pronouns: body.pronouns,
        locale: body.locale,
        timezone: body.timezone,
        image: body.image,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "An error occurred while updating user data" },
      { status: 500 }
    );
  }
}

// Set runtime to nodejs
export const runtime = 'nodejs'; 
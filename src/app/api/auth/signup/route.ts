//src/app/api/auth/signup/route.ts

import { directPrisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Signup API called");
    
    // Parse request body
    const body = await req.json().catch(err => {
      console.error("Failed to parse request body:", err);
      return null;
    });
    
    if (!body) {
      console.error("Invalid request body");
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    
    const { name, email, password } = body;
    console.log("Request received with:", { name, email, passwordLength: password?.length });

    if (!name || !email || !password) {
      console.error("Missing required fields:", { name: !!name, email: !!email, password: !!password });
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user exists - using direct connection
    console.log("Checking if user exists:", email);
    try {
      const existingUser = await directPrisma.user.findUnique({ where: { email } });
      if (existingUser) {
        console.log("User already exists:", email);
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }
    } catch (err) {
      console.error("Error checking for existing user:", err);
      return NextResponse.json({ error: "Database error checking for existing user" }, { status: 500 });
    }

    // Hash password before saving
    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in Prisma - using direct connection
    console.log("Creating user in database");
    try {
      const newUser = await directPrisma.user.create({
        data: { 
          name, 
          email, 
          password: hashedPassword,
          role: "STUDENT"
        },
      });

      console.log("User created successfully:", newUser.id);
      return NextResponse.json(
        { message: "User created successfully", userId: newUser.id }, 
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Error creating user in database:", dbError);
      return NextResponse.json({ error: "Failed to create user account" }, { status: 500 });
    }

  } catch (error) {
    console.error("Signup error:", error);
    
    // More detailed error response
    let message = "Internal Server Error";
    let status = 500;
    
    if (error instanceof Error) {
      message = error.message;
      
      // Check for Prisma-specific errors
      if (error.name === 'PrismaClientKnownRequestError') {
        const prismaError = error as any;
        if (prismaError.code === 'P2002') {
          message = "Email already exists";
          status = 409;
        }
      }
    }
    
    return NextResponse.json({ error: message }, { status });
  }
}

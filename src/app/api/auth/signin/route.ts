import { directPrisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Sign-in API called");
    
    // Parse request body
    const body = await req.json().catch(err => {
      console.error("Failed to parse request body:", err);
      return null;
    });
    
    if (!body) {
      console.error("Invalid request body");
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    
    const { email, password } = body;
    console.log("Sign-in attempt for:", email);

    if (!email || !password) {
      console.error("Missing credentials");
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find the user
    try {
      const user = await directPrisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true, name: true, role: true }
      });

      if (!user || !user.password) {
        console.log("User not found:", email);
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        console.log("Invalid password for:", email);
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      
      // Return user data (without password)
      const { password: _, ...userData } = user;
      console.log("User authenticated successfully:", user.id);
      
      return NextResponse.json({
        success: true,
        user: userData
      });
      
    } catch (err) {
      console.error("Error during authentication:", err);
      return NextResponse.json({ error: "Authentication error" }, { status: 500 });
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 
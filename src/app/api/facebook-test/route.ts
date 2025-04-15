import { NextRequest, NextResponse } from "next/server";

// This endpoint can be used to verify your app's integration with Facebook
export async function GET(req: NextRequest) {
  try {
    // Return basic info that Facebook can verify
    return NextResponse.json({
      status: "success",
      message: "Facebook integration test endpoint is working",
      app_id: process.env.FACEBOOK_CLIENT_ID || process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error("Facebook test API error:", error);
    return NextResponse.json(
      { 
        status: "error",
        message: "An error occurred during the Facebook test" 
      },
      { status: 500 }
    );
  }
}

// Handle verification requests from Facebook
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log("Facebook verification request:", body);
    
    return NextResponse.json({
      status: "success",
      message: "Facebook verification received",
      received_data: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Facebook verification error:", error);
    return NextResponse.json(
      { 
        status: "error",
        message: "An error occurred during Facebook verification" 
      },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from "next/server";
import { fetchExamPapers } from "@/lib/utils/examinations";

/**
 * API route to fetch exam papers from examinations.ie based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get search parameters from the request
    const subject = searchParams.get("subject") || undefined;
    const year = searchParams.get("year") || undefined;
    const level = searchParams.get("level") || undefined;
    const examType = searchParams.get("examType") || undefined;
    
    // Fetch exam papers based on the provided parameters
    const papers = await fetchExamPapers({
      subject,
      year,
      level,
      examType,
    });
    
    // Return the papers as JSON
    return NextResponse.json({ papers });
  } catch (error) {
    console.error("Error fetching exam papers:", error);
    return NextResponse.json(
      { error: "Failed to fetch exam papers" },
      { status: 500 }
    );
  }
}

// Set runtime to nodejs to avoid crypto module issues
export const runtime = 'nodejs'; 
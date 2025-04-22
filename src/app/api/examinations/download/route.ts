import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

/**
 * API route to proxy the download of an exam paper from examinations.ie
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");
    const filename = searchParams.get("filename") || "exam-paper.pdf";
    
    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }
    
    // Validate the URL to ensure it's from examinations.ie
    if (!url.includes("examinations.ie")) {
      return NextResponse.json(
        { error: "Invalid URL. Only examinations.ie URLs are allowed" },
        { status: 400 }
      );
    }
    
    // Fetch the PDF file
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    
    // Prepare the response headers
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    
    // Return the PDF file
    return new NextResponse(response.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error downloading exam paper:", error);
    return NextResponse.json(
      { error: "Failed to download exam paper" },
      { status: 500 }
    );
  }
} 
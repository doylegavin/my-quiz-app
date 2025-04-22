import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

// Ensure we're using the Node.js runtime
export const runtime = 'nodejs';

// Define request interface
interface SliceRequest {
  years: number[];
  pages: number[];
  type: string;
  code: string;
  subject?: string;
}

// Subject code mapping for common subjects
const subjectCodes: Record<string, string> = {
  "Mathematics": "037",
  "English": "001",
  "Irish": "003",
  "French": "008",
  "German": "005",
  "Biology": "025",
  "Chemistry": "026",
  "Physics": "027",
  "Accounting": "017",
  "Business": "022",
  "Economics": "023",
  "History": "020",
  "Geography": "035",
  // Default code for other subjects
  "default": "018"
};

// Generate URL patterns to try
function generateUrlPatterns(year: number, type: string, subjectCode: string, code: string): string[] {
  // Extract level code (AL/GL/BL) and paper number
  const levelCode = code.substring(0, 2); // AL, GL, BL
  const paperNum = code.substring(2); // P1, P2, PI, MS, etc.
  
  // Main archive path for different content types
  const archivePath = type === "exampapers" ? "exam/papers" : "exam/markingschemes";
  
  return [
    // Common formats 
    `https://www.examinations.ie/${archivePath}/${year}/LC/${subjectCode}_${levelCode}_${paperNum}.pdf`,
    `https://www.examinations.ie/${archivePath}/${year}/LC_${subjectCode}_${levelCode}_${paperNum}.pdf`,
    `https://www.examinations.ie/archive/${type}/${year}/LC${subjectCode}${code}.pdf`,
    `https://www.examinations.ie/archive/${type}/${year}/LC${code}.pdf`
  ];
}

export async function POST(request: NextRequest) {
  try {
    // First, return a test response to check if API is working
    return NextResponse.json({
      success: true,
      message: "API response test mode",
      note: "This is a test response to confirm the API is working"
    });
    
    // Parse request body
    const data: SliceRequest = await request.json();
    const { years, pages, type, code, subject } = data;
    
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();
    
    // Return a simple response for now
    return NextResponse.json({
      success: true,
      message: "PDF API working",
      received: data
    });
  } catch (error) {
    console.error('Error in PDF route:', error);
    return NextResponse.json(
      { error: 'API error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
import { NextRequest } from 'next/server';

// This API route is no longer needed since we're generating PDFs directly in the browser
// Keeping it as a placeholder for now
export async function POST(request: NextRequest) {
  return new Response(
    JSON.stringify({ 
      message: 'PDF generation has been moved to client-side. This API endpoint is deprecated.' 
    }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
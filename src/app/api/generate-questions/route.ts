// src/app/api/generate-questions/route.ts

import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  maxDuration: 60, // Set max duration to 60 seconds
};

export async function POST(req: Request) {
  try {
    // Accept either topic or topics for backward compatibility
    const requestData = await req.json();
    const { 
      subject, 
      level, 
      paper, 
      sections, 
      difficulty, 
      subtopic 
    } = requestData;
    
    // Allow either topic or topics for backward compatibility
    const topic = requestData.topic || requestData.topics || "Random";
    
    // Build the base instructions

let baseInstructions = `
You are an exam creator for the Leaving Certificate in Ireland.
Return valid JSON with "questions" and "solutions" keys. Double-escape LaTeX backslashes (\\\\).
No text outside JSON. Example structure:
{
  "questions": [
    {
      "question": "Solve \\\\(2x + 3 = 7\\\\).",
      "geogebraCommands": "ZoomIn(0,6,-10,20)",
      "diagram": {
        "type": "coordinate",
        "xMin": 0, "xMax": 6, "yMin": -10, "yMax": 20
      }
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Rearrange to get \\\\(x=2\\\\).",
      "notes": "One step solution",
      "markingScheme": "0,4,7,10 Marks\\\\nLow: Finds 2+ points\\\\nHigh: Plots correctly",
      "geogebraCommands": "f(x)=3x^2-20x+10;ZoomIn(0,6,-10,20)",
      "diagram": {
        "type": "coordinate",
        "xMin": 0, "xMax": 6, "yMin": -10, "yMax": 20,
        "functions": [{ "equation": "3x^2-20x+10", "color": "blue" }]
      }
    }
  ]
}`;
    
    // Build the user prompt with all available parameters
    let userPrompt = `
    Generate ${level} ${subject} questions that is difficulty ${difficulty} on the topic: ${topic}.
    
    For any graphing or visualization questions:
    - Include "geogebraCommands" field in both questions and solutions
    - For questions, only provide axis limits with "ZoomIn(xmin,xmax,ymin,ymax)"
    - For solutions, provide the full plotting command with function and limits
    - Provide detailed marking schemes with partial credit breakdown
    
   
`;
    
// Add paper information if provided
if (paper && paper !== "Both") {
  userPrompt += ` Focus on ${paper} content.`;
}

// Add section information if provided
if (sections) {
  userPrompt += ` Include ${sections} type questions.`;
}

// Add subtopic information if provided
if (subtopic) {
  userPrompt += ` Specifically focus on the subtopic: ${subtopic}.`;
}

// Final instructions
userPrompt += `
    All math must be double-escaped LaTeX.
    
    Return JSON only, with keys "questions" and "solutions".
    No extra text.
    `;
    
    console.log("Sending to OpenAI:", userPrompt);
    
    try {
      let retryCount = 0;
      const maxRetries = 3;
      let lastError: any;
      
      while (retryCount <= maxRetries) {
        try {
          // Apply backoff if this is a retry
          if (retryCount > 0) {
            const backoffDelay = Math.pow(2, retryCount - 1) * 1000;
            console.log(`Retry attempt ${retryCount} after ${backoffDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, backoffDelay));
          }
          
          // Set a timeout for the OpenAI request
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout
          
          const response = await openai.chat.completions.create({
            model: "ft:gpt-4o-2024-08-06:personal:my-quiz-app2:AoXLUjAo",
            messages: [
              { role: "system", content: baseInstructions },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.5,
          }, { signal: controller.signal }); // Add the signal here
          
          clearTimeout(timeoutId); // Clear the timeout if request completes
          
          // Log raw response for debugging
          console.log("Raw OpenAI Response:", response.choices[0]?.message?.content);
          
          let content = response.choices[0]?.message?.content?.trim() || "";
          
          try {
            const data = JSON.parse(content);
            
            // Return data with metadata
            return NextResponse.json({
              ...data,
              metadata: {
                subject,
                level,
                difficulty,
                paper,
                sections,
                topic,
                subtopic
              }
            });
          } catch (parseError) {
            console.error("JSON parse error:", parseError, "Content:", content);
            return NextResponse.json(
              { error: "Failed to parse response", content },
              { status: 500 }
            );
          }
        } catch (error: any) {
          lastError = error;
          
          // Check if error is a timeout or server error
          const isRetryableError = 
            error.name === 'AbortError' || 
            error.status === 429 || 
            error.status === 500 || 
            error.status === 503 ||
            error.status === 504;
          
          if (!isRetryableError) {
            throw error;
          }
          
          retryCount++;
          
          if (retryCount > maxRetries) {
            break;
          }
        }
      }
      
      // If we got here, we exhausted all retries
      console.error("OpenAI request failed after multiple attempts:", lastError);
      return NextResponse.json(
        { error: "The AI model couldn't generate questions after multiple attempts. Please try again with a simpler request." },
        { status: 503 }
      );
    } catch (openaiError: any) {
      console.error("OpenAI request error:", openaiError);
      return NextResponse.json(
        { error: "The AI model took too long to respond. Please try again." },
        { status: 503 }
      );
    }
  } catch (error: unknown) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
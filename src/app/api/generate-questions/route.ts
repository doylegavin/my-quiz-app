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
    
    IMPORTANT: This must be valid JSON.
    - Double-escape any backslashes in LaTeX.
      For example, LaTeX inline math should appear as: \\( x^2 \\)
      becomes \\\\( x^2 \\\\) in the raw JSON.
    
    If special characters are used in maths make sure to escape before: e.g.
      $$
      \$2000
      $$
      
    Return JSON with "questions" and "solutions" keys, for example:
    {
      "questions": [
        {"question": "Solve \\\\(2x + 3 = 7\\\\)."}
      ],
      "solutions": [
        {
          "questionIndex": 1,
          "solution": "Rearrange to get \\\\(x=2\\\\).",
          "notes": "One step solution",
          "markingScheme": "2 marks"
        }
      ]
    }
    No extra text outside JSON.
    `;
    
    // Build the user prompt with all available parameters
    let userPrompt = `
    Produce ${level} ${subject} questions that is difficulty ${difficulty} on the topic: ${topic}.
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
      // Set a timeout for the OpenAI request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout
      
      const response = await openai.chat.completions.create({
        model: "ft:gpt-4o-2024-08-06:personal:my-quiz-app2:AoXLUjAo",
        messages: [
          { role: "system", content: baseInstructions },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
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
    } catch (openaiError) {
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
// src/app/api/generate-questions/route.ts

import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// New Next.js route config format
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds timeout

// Define calculation-based subjects that should use LaTeX
const calculationSubjects = [
  "mathematics", 
  "appliedmathematics", 
  "physics", 
  "chemistry", 
  "accounting", 
  "economics", 
  "constructionstudies", 
  "designandcommunicationgraphics", 
  "engineering", 
  "technology"
];

// Define language subjects
const languageSubjects = [
  "english", 
  "irish", 
  "french", 
  "german", 
  "spanish", 
  "italian", 
  "russian", 
  "japanese", 
  "arabic", 
  "hebrewstudies", 
  "latin", 
  "ancientgreek", 
  "polish", 
  "mandarinchinese", 
  "portuguese", 
  "lithuanian"
];

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
      subtopic,
      paperType
    } = requestData;
    
    // Allow either topic or topics for backward compatibility
    const topic = requestData.topic || requestData.topics || "Random";
    
    // Check if this is a calculation-based subject
    const requiresLatex = calculationSubjects.includes(subject);
    const isLanguageSubject = languageSubjects.includes(subject);
    
    // Build the base instructions
    let baseInstructions = `
You are an expert exam creator for the Irish education system, specializing in ${level} ${subject}.
Return valid JSON with "questions" and "solutions" keys.${requiresLatex ? " All mathematical expressions and calculations must use LaTeX with double-escaped backslashes (\\\\\\\\)." : ""}
No text outside JSON. Follow this structure:
{
  "questions": [
    {
      "question": "Question text${requiresLatex ? " with mathematics in LaTeX format \\\\\\\\(x^2 + 2x + 1 = 0\\\\\\\\)" : ""}${isLanguageSubject ? ", including any comprehension text, poem, or passage that the question refers to" : ""}.",
      ${requiresLatex ? `"geogebraCommands": "ZoomIn(-10,10,-10,10)", // Include for graphing questions` : `"geogebraCommands": "", // Include only if graphing is involved`}
      "diagram": null // Include diagram object only if a diagram is needed
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Detailed solution with reasoning and steps${requiresLatex ? " using LaTeX for all calculations \\\\\\\\(x = -1\\\\\\\\)" : ""}.",
      "notes": "Teaching notes or common mistakes to avoid.",
      "markingScheme": "0,4,7,10 Marks\\\\nLow: Partial understanding\\\\nHigh: Complete solution",
      ${requiresLatex ? `"geogebraCommands": "f(x)=x^2+2x+1;ZoomIn(-10,10,-10,10)", // Include for graphing questions` : `"geogebraCommands": "", // Include only if graphing is involved`}
      "diagram": null // Include diagram object only if a diagram is needed
    }
  ]
}

Questions should match the expected ${level} standard for ${subject} and reflect authentic exam questions.
Provide detailed, clear solutions that would help students understand the concepts.
Include appropriate marking schemes that reflect partial and full credit scenarios.`;
    
    // Subject-specific instructions
    if (requiresLatex) {
      baseInstructions += `
For calculation-based subjects, ensure:
- ALL calculations, equations, and mathematical expressions use LaTeX with double-escaped backslashes
- Example question: "Solve the quadratic equation: \\\\(ax^2 + bx + c = 0\\\\) for \\\\(a=1\\\\), \\\\(b=2\\\\), and \\\\(c=1\\\\)."
- Example solution: "Using the quadratic formula: \\\\(x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}\\\\)
  With our values: \\\\(x = \\\\frac{-2 \\\\pm \\\\sqrt{2^2 - 4 \\\\cdot 1 \\\\cdot 1}}{2 \\\\cdot 1}\\\\)
  Simplifying: \\\\(x = \\\\frac{-2 \\\\pm \\\\sqrt{4 - 4}}{2} = \\\\frac{-2 \\\\pm 0}{2} = -1\\\\)"
- Step-by-step solutions must show all working with LaTeX for each step
- Include graphing information where appropriate with proper axis labels and scale
- Use "geogebraCommands" for any graphing elements (f(x)=... format)
- Provide axis boundaries using "ZoomIn(xmin,xmax,ymin,ymax)" in questions
- For solutions, provide complete function with "f(x)=" and boundaries
- Marking schemes should allocate points for method as well as final answers`;
    } else if (isLanguageSubject) {
      baseInstructions += `
For language subjects (${subject}), ensure:
- ALL questions and answers should be in the ${subject} language (except for instructions if appropriate)
- Include appropriate comprehension, grammar, and production tasks
- For comprehension tasks, include the FULL text, passage, dialogue, or poem directly in the question
  (Exception: do NOT include prescribed texts that are part of the curriculum)
- Example format for a comprehension question:
  {
    "question": "Read the following passage and answer the questions below:\\n\\n[FULL TEXT OF PASSAGE]\\n\\n1. What is the main theme of this passage?\\n2. How does the author convey the protagonist's emotions?"
  }
- For language production questions, specify word counts and format requirements
- Include vocabulary and grammar expectations in marking schemes
- Provide sample answers that demonstrate expected quality at this level
- Flag common language errors and misconceptions in the notes section`;
    } else if (subject === "history" || subject === "geography" || subject === "religiouseducation" || subject === "politicsandsociety") {
      baseInstructions += `
For humanities subjects, ensure:
- Questions reflect both knowledge recall and critical analysis
- Include appropriate source-based questions where relevant
- For source-based questions, include the full source text, image description, or data within the question
- Example format for a source-based question:
  {
    "question": "Study the following source and answer the questions below:\\n\\n[FULL SOURCE TEXT OR IMAGE DESCRIPTION]\\n\\n1. What evidence does the source provide about...?\\n2. How reliable is this source for understanding...?"
  }
- Solutions should demonstrate expected depth of analysis and evidence
- Marking schemes should reflect knowledge, understanding, and critical thinking
- Include key points, quotes, or references expected in high-quality answers`;
    } else if (subject === "biology" || subject === "agriculturalscience") {
      baseInstructions += `
For life science subjects, ensure:
- Questions cover both theoretical knowledge and practical applications
- Include diagram labeling or interpretation questions where appropriate
- Solutions should be scientifically accurate and use correct terminology
- Include experimental design or interpretation questions if relevant
- For calculation questions in sciences, use LaTeX format: \\\\(C_1V_1 = C_2V_2\\\\)
- Marking schemes should reflect factual accuracy and understanding of processes`;
    }
    
    // Build the user prompt with all available parameters
    let userPrompt = `
Generate ${level} ${subject} questions with ${difficulty} difficulty on the topic: ${topic}.`;

    // Add paper information if provided
    if (paper && paper !== "Both") {
      userPrompt += `\nFocus on ${paper} content.`;
    }

    // Add section information if provided
    if (sections) {
      userPrompt += `\nInclude ${sections} type questions.`;
    }

    // Add subtopic information if provided
    if (subtopic) {
      userPrompt += `\nSpecifically focus on the subtopic: ${subtopic}.`;
    }

    // Subject-specific prompt additions
    if (requiresLatex) {
      userPrompt += `
For all questions with calculations:
- Use LaTeX with double-escaped backslashes for ALL mathematical expressions
- Example: "Solve \\\\(2x + 3 = 7\\\\)" rather than "Solve 2x + 3 = 7"
- For fractions, use \\\\(\\\\frac{numerator}{denominator}\\\\) format
- For powers, use \\\\(x^{power}\\\\) format
- For square roots, use \\\\(\\\\sqrt{expression}\\\\) format
- Include "geogebraCommands" field for ALL graphing questions
- For questions, provide axis limits with "ZoomIn(xmin,xmax,ymin,ymax)"
- For solutions, provide the full plotting command with "f(x)=" and limits
- Provide detailed marking schemes with partial credit breakdown`;
    } else if (isLanguageSubject) {
      userPrompt += `
For ${subject} language questions:
- Write ALL questions and expected answers in ${subject} (except for basic instructions if needed)
- Include the full comprehension text, passage, poem, or dialogue WITHIN the question text
- Do NOT include texts that are prescribed in the curriculum (students should already have these)
- For comprehension questions, provide the text first, followed by specific questions
- Include a mix of comprehension, grammar, and production tasks
- For writing tasks, specify word counts and format expectations
- Ensure grammar questions test understanding appropriate to ${level}
- Provide detailed marking criteria for written production tasks`;
    } else if (subject === "history" || subject === "geography") {
      userPrompt += `
For essay or extended response questions:
- Include any source material WITHIN the question text (documents, maps, data, etc.)
- Include clear word count or time expectations
- Provide marking schemes that reflect argument, evidence, and analysis
- Sample answers should demonstrate appropriate structure and depth
- Include primary source analysis where appropriate`;
    }

    // Final instructions
    userPrompt += `

Return JSON only, with keys "questions" and "solutions".
No extra text or explanations outside the JSON.`;
    
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
            model: "gpt-4.1-nano-2025-04-14",
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
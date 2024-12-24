// src/app/api/generate-questions/route.ts

import OpenAI from "openai";
import { NextResponse } from "next/server";

// Example lists (replace these with actual curriculum data)
//const currentEnglishPoets = ["Eavan Boland", "Seamus Heaney", "Emily Dickinson"];
//const currentIrishPoets = ["Nuala Ní Dhomhnaill", "Máire Mhac an tSaoi"];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { subject, topic, level, paper, questionCount, difficulty } = await req.json();

    // Build the base instructions here and conditionally add instructions
    // based on subject/topic (as previously discussed)
    let baseInstructions = `
    You are an exam creator for the Leaving Certificate in Ireland.
    
    IMPORTANT: This must be valid JSON. 
    - Double-escape any backslashes in LaTeX. 
      For example, LaTeX inline math should appear as: \\( x^2 \\) 
      becomes \\\\( x^2 \\\\) in the raw JSON.
    
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
    
    const userPrompt = `
    Produce ${questionCount} ${level} ${subject} questions that is difficulty ${difficulty} on the topic: ${topic}.
    All math must be double-escaped LaTeX. 
    Return JSON only, with keys "questions" and "solutions".
    No extra text.
    `;
    
      /* // For English poetry, for example:
      if (subject === "english" && topic.toLowerCase().includes("poetry")) {
        const poet = currentEnglishPoets[Math.floor(Math.random() * currentEnglishPoets.length)];
        baseInstructions += `
        Include an unseen poem by ${poet}.
        Ask ${questionCount} questions based on the poem, then provide a separate solutions section.
        Each solution should have notes and marking scheme.
      `;
      } */
      
      // ... Add similar logic for Irish, Maths, etc. here

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: baseInstructions },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    let content = response.choices[0]?.message?.content?.trim() || "";
    const data = JSON.parse(content);

    // Ensure data has the correct structure
    // data should have keys: questions and solutions

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}

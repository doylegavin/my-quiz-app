//src/api/questions/route.tsx

import { strict_output } from "@/lib/gpt";
//import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";
//export const maxDuration = 500;



export async function POST(req: Request) {
    try {
      const { subject, difficulty, topic, level, paper, questionCount } = await req.json();

    const prompt = `
      Generate ${questionCount} ${level} ${subject} questions on ${topic} for ${paper} that are ${difficulty} difficulty level.
      Include solutions and marking scheme with notes if applicable.
      All math expressions must be written in LaTeX. 
      - Use inline math notation for shorter expressions, like \\( x + y \\).
      - For multi-line derivations or bigger expressions, use display math notation: $$ x^2 + y^2 = 1 $$.
    `;

    const systemPrompt = `
      You are an expert tutor creating exam questions.
      Return the output as valid JSON array of objects, 
      each containing "question", "solution" and "markingScheme" keys.
      Do not include any extra keys.
      Example: [{"question":"...","solution":"...","markingScheme":"..."}]
    `;

    const outputFormat = {
      question: "<string>",
      solution: "<string>",
      markingScheme: "<string>"
    };
  
      const questions = await strict_output(systemPrompt, prompt, outputFormat);
  
      return NextResponse.json({ questions });
    } catch (error) {
      console.error("Error generating questions:", error);
      return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
    }
  }
  






/* export async function POST(req: Request, res: Response) {
  try {
    //const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a game." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
      );
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
} */
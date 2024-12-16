// src/app/api/game/route.tsx

import { prisma } from "@/lib/db";
// import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

// POST: Simplified version for creating a game without database references
export async function POST(req: Request) {
  try {
    const { topic, type, amount } = await req.json();

    // Generate questions via the questions API
    const questionsResponse = await axios.post("/api/questions", {
      amount,
      topic,
      type,
    });

    return NextResponse.json(
      { questions: questionsResponse.data.questions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}
/* 
// POST: Full version for creating a game with Prisma database and additional features
//export async function POST(req: Request /*, res: Response ) {
 // try {
    // Uncomment and configure authentication as needed
    // const session = await getAuthSession();
    /* if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
        { status: 401 }
      );
    } 

    const body = await req.json();
    const { topic, type, amount } = quizCreationSchema.parse(body);

    // Create a new game entry in the database
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        // userId: session.user.id, // Link the game to a user
        topic,
      },
    });

    // Update or create a topic count entry
    await prisma.topic_count.upsert({
      where: { topic },
      create: { topic, count: 1 },
      update: { count: { increment: 1 } },
    });

    // Generate questions via external API
    const { data } = await axios.post(
      `${process.env.API_URL as string}/api/questions`,
      { amount, topic, type }
    );

    // Handle multiple-choice questions
    if (type === "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };

      const manyData = data.questions.map((question: mcqQuestion) => {
        const options = [
          question.option1,
          question.option2,
          question.option3,
          question.answer,
        ].sort(() => Math.random() - 0.5); // Randomize options

        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });

      await prisma.question.createMany({ data: manyData });
    } else if (type === "open_ended") {
      type openQuestion = {
        question: string;
        answer: string;
      };

      await prisma.question.createMany({
        data: data.questions.map((question: openQuestion) => ({
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended",
        })),
      });
    }

    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
  }
}
 */



// GET: Retrieve a game by ID and include associated questions
export async function GET(req: Request /*, res: Response */) {
  try {
    // Uncomment and configure authentication as needed
    // const session = await getAuthSession();
    /* if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to access game data." },
        { status: 401 }
      );
    } */

    const url = new URL(req.url);
    const gameId = url.searchParams.get("gameId");

    if (!gameId) {
      return NextResponse.json(
        { error: "You must provide a game ID." },
        { status: 400 }
      );
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { questions: true }, // Include related questions
    });

    if (!game) {
      return NextResponse.json(
        { error: "Game not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ game }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

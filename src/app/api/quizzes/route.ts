import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      title, 
      description, 
      subject, 
      level, 
      difficulty, 
      topic, 
      section, 
      subtopic,
      paper,
      userId,
      isPublic,
      questions 
    } = body;

    const quiz = await prisma.generatedQuiz.create({
      data: {
        title: title || "Untitled Quiz",
        description: description || "",
        subject,
        level,
        difficulty: difficulty || "Random",
        paper,
        section,
        topic,
        subtopic,
        userId,
        isPublic: isPublic ?? true,
        questions: {
          create: questions.map((q: any) => ({
            question: q.question,
            solution: q.solution,
            metadata: q.metadata || {}
          }))
        }
      }
    });

    return NextResponse.json({ id: quiz.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to create quiz' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const isPublic = searchParams.get('isPublic') === 'true';
    const subject = searchParams.get('subject');
    const level = searchParams.get('level');
    
    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }
    
    if (isPublic) {
      where.isPublic = true;
    }
    
    if (subject) {
      where.subject = subject;
    }
    
    if (level) {
      where.level = level;
    }
    
    const quizzes = await prisma.generatedQuiz.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        questions: {
          select: {
            id: true
          }
        },
        user: {
          select: {
            name: true
          }
        }
      }
    });
    
    // Format the response to include question count
    const formattedQuizzes = quizzes.map(quiz => {
      // Generate a descriptive title for untitled quizzes
      let displayTitle = quiz.title;
      if (!displayTitle || displayTitle === "Untitled Quiz") {
        // Format: "HL Mathematics Medium Algebra" or similar
        const levelPrefix = quiz.level ? `${quiz.level.split(" ")[0]} ` : "";
        const subjectText = quiz.subject ? `${quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1)} ` : "";
        const difficultyText = quiz.difficulty && quiz.difficulty !== "Random" ? `${quiz.difficulty} ` : "";
        const topicText = quiz.topic || "";
        
        displayTitle = `${levelPrefix}${subjectText}${difficultyText}${topicText}`.trim() || "Untitled Quiz";
      }
      
      return {
        id: quiz.id,
        title: displayTitle,
        subject: quiz.subject,
        level: quiz.level,
        difficulty: quiz.difficulty,
        topic: quiz.topic,
        createdAt: quiz.createdAt,
        questionCount: quiz.questions.length,
        createdBy: quiz.user?.name || "Anonymous"
      };
    });
    
    return NextResponse.json(formattedQuizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
} 
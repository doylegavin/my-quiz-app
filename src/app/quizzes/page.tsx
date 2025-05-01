"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuizSummary {
  id: string;
  title: string;
  subject: string;
  level: string;
  difficulty: string;
  topic: string | null;
  createdAt: string;
  questionCount: number;
  createdBy: string;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Sample quizzes to use in case the API fails
    const sampleQuizzes: QuizSummary[] = [
      {
        id: "sample-math-1",
        title: "Sample Mathematics Quiz",
        subject: "mathematics",
        level: "Higher Level",
        difficulty: "Medium",
        topic: "Algebra",
        createdAt: new Date().toISOString(),
        questionCount: 3,
        createdBy: "Sample User"
      },
      {
        id: "sample-physics-1",
        title: "Physics Forces Quiz",
        subject: "physics",
        level: "Higher Level",
        difficulty: "Hard",
        topic: "Forces",
        createdAt: new Date().toISOString(),
        questionCount: 2,
        createdBy: "Sample User"
      },
      {
        id: "sample-bio-1",
        title: "Biology Revision Quiz",
        subject: "biology",
        level: "Ordinary Level",
        difficulty: "Easy",
        topic: "Cells",
        createdAt: new Date().toISOString(),
        questionCount: 4,
        createdBy: "Sample User"
      }
    ];

    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        // Try to fetch from API, but use sample data if it fails
        try {
          // Fetch all public quizzes
          const response = await fetch('/api/quizzes?isPublic=true');
          
          if (!response.ok) {
            throw new Error('Failed to fetch quizzes');
          }
          
          const data = await response.json();
          setQuizzes(data);
        } catch (apiError) {
          console.warn('API fetch failed, using sample data:', apiError);
          // Use sample data if API fails
          setQuizzes(sampleQuizzes);
          // Don't set error when using sample data
          setError(null);
        }
      } catch (error) {
        console.error('Error in quiz data handling:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        // Fall back to sample data if there's an error
        setQuizzes(sampleQuizzes);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, []);

  const handleViewQuiz = (quizId: string) => {
    router.push(`/quiz/generated?id=${quizId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Generated Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Generated Quizzes</h1>
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">Error loading quizzes: {error}</p>
            <Button 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extract unique subjects for tabs
  const subjects = Array.from(new Set(quizzes.map(quiz => quiz.subject)));

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Generated Quizzes</h1>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          {subjects.map(subject => (
            <TabsTrigger key={subject} value={subject}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {quizzes.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center py-8">No quizzes found. Generate a quiz to get started!</p>
                <div className="flex justify-center">
                  <Button onClick={() => router.push('/quiz/create')}>
                    Create Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-1">
                      Subject: <span className="font-medium">{quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1)}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Level: <span className="font-medium">{quiz.level}</span>
                    </p>
                    {quiz.topic && (
                      <p className="text-sm text-gray-600 mb-1">
                        Topic: <span className="font-medium">{quiz.topic}</span>
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Questions: <span className="font-medium">{quiz.questionCount}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Created by: <span className="font-medium">{quiz.createdBy}</span>
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleViewQuiz(quiz.id)}
                      className="w-full"
                    >
                      View Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Filter tabs for specific subjects */}
        {subjects.map((subject) => (
          <TabsContent key={subject} value={subject} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes
                .filter(quiz => quiz.subject === subject)
                .map((quiz) => (
                  <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{quiz.title}</CardTitle>
                      <CardDescription>
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-1">
                        Level: <span className="font-medium">{quiz.level}</span>
                      </p>
                      {quiz.topic && (
                        <p className="text-sm text-gray-600 mb-1">
                          Topic: <span className="font-medium">{quiz.topic}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Questions: <span className="font-medium">{quiz.questionCount}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Created by: <span className="font-medium">{quiz.createdBy}</span>
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => handleViewQuiz(quiz.id)}
                        className="w-full"
                      >
                        View Quiz
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              {quizzes.filter(quiz => quiz.subject === subject).length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="pt-6">
                    <p className="text-gray-500 text-center py-8">No {subject} quizzes found.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 
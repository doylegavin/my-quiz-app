"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { QuizQuestion } from '@/types';

interface QuizPageProps {
  params: {
    id: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const { id } = params;
  const router = useRouter();
  const { data: session } = useSession();
  
  const [quiz, setQuiz] = useState<{
    id: string;
    title: string;
    questions: QuizQuestion[];
  } | null>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch quiz data from an API
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        
        // Mock API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock quiz data
        const mockQuiz = {
          id,
          title: "Sample Mathematics Quiz",
          questions: [
            {
              id: "q1",
              question: "What is 2 + 2?",
              options: ["3", "4", "5", "6"],
              answer: "4",
              questionType: "multiple-choice" as "multiple-choice" | "true-false" | "short-answer"
            },
            {
              id: "q2",
              question: "What is the square root of 16?",
              options: ["2", "4", "8", "16"],
              answer: "4",
              questionType: "multiple-choice" as "multiple-choice" | "true-false" | "short-answer"
            },
            {
              id: "q3",
              question: "What is 3 × 5?",
              options: ["8", "10", "15", "20"],
              answer: "15",
              questionType: "multiple-choice" as "multiple-choice" | "true-false" | "short-answer"
            },
            {
              id: "q4",
              question: "What is 10 ÷ 2?",
              options: ["3", "4", "5", "6"],
              answer: "5",
              questionType: "multiple-choice" as "multiple-choice" | "true-false" | "short-answer"
            },
            {
              id: "q5",
              question: "What is 7 - 3?",
              options: ["2", "3", "4", "5"],
              answer: "4",
              questionType: "multiple-choice" as "multiple-choice" | "true-false" | "short-answer"
            }
          ] as QuizQuestion[]
        };
        
        setQuiz(mockQuiz);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    if (isSubmitted) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (!quiz) return;
    
    let correctAnswers = 0;
    
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setIsSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-6">
          Quiz not found
        </div>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Return Home
        </button>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isAllAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {isSubmitted ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl font-bold mb-4">
              {score} / {quiz.questions.length}
            </div>
            <div className="text-xl mb-6">
              {(score / quiz.questions.length) * 100}% Correct
            </div>
            
            <div className="space-y-4 mb-8">
              {quiz.questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.answer;
                return (
                  <div 
                    key={question.id} 
                    className={`p-4 rounded-lg ${
                      isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="font-medium mb-2">
                      Question {index + 1}: {question.question}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Your answer:</span> {selectedAnswers[index] || 'Not answered'}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Correct answer:</span> {question.answer}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="text-sm">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {currentQuestionData.question}
              </h2>
              
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion, option)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAnswers[currentQuestion] === option
                        ? 'bg-blue-50 border-blue-500'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2 font-medium">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full ${
                    selectedAnswers[index] !== undefined
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  } ${
                    currentQuestion === index ? 'ring-2 ring-blue-300' : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isAllAnswered}
                className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:bg-green-300"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-blue-300"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
} 
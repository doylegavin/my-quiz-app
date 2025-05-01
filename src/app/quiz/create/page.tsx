"use client";

// app/(quiz)/create/page.tsx
import { QuizForm } from "@/components/quiz-form";
import useProtectedPage from "@/hooks/useProtectedPage";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function CreateQuizPage() {
  // Get authentication overlay and status from our hook
  const { authOverlay, isAuthenticated, isLoading, session } = useProtectedPage();
  const [isHovered, setIsHovered] = useState(false);

  // Log authentication status for debugging
  useEffect(() => {
    console.log("Quiz Create Page - Auth Status:", {
      isAuthenticated,
      isLoading,
      sessionExists: !!session
    });
  }, [isAuthenticated, isLoading, session]);

  return (
    <>
      <div className="mx-auto max-w-2xl pb-16 pt-12 relative">
        {/* Magnifying glass button */}
        <div className="absolute top-0 right-0 z-10">
          <Link
            href="/quizzes"
            className="flex items-center px-3 py-2 text-brand  transition-all duration-300 bg-white rounded-md shadow-sm group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FiSearch size={20} />
            <span 
              className={`ml-2 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHovered ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
              }`}
            >
             <strong> Browse created quizzes</strong>
            </span>
          </Link>
        </div>
        
        <h1 className="text-center text-3xl font-bold md:text-4xl">Create New Quiz</h1>
        {isAuthenticated ? (
          <QuizForm />
        ) : (
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
              {isLoading ? "Loading..." : "Please sign in to create a quiz"}
            </p>
          </div>
        )}
      </div>
      
      {/* Auth overlay - shows when user is not authenticated */}
      {authOverlay}
    </>
  );
}
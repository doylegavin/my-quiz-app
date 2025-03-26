"use client";

// app/(quiz)/create/page.tsx
import { QuizForm } from "@/components/quiz-form";
import useProtectedPage from "@/hooks/useProtectedPage";
import { useEffect } from "react";

export default function CreateQuizPage() {
  // Get authentication overlay and status from our hook
  const { authOverlay, isAuthenticated, isLoading, session } = useProtectedPage();

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
      <div className="mx-auto max-w-2xl pb-16 pl-9 pt-8">
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
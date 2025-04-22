"use client";

import { Suspense } from "react";
import ExamPaperExplorer from "@/components/ExamPaperExplorer";
import useProtectedPage from "@/hooks/useProtectedPage";

export default function ExamsPage() {
  // Get authentication overlay and status from our hook
  const { authOverlay, isAuthenticated, isLoading, session } = useProtectedPage();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Exam Papers</h1>
      
      {isAuthenticated ? (
        <Suspense fallback={<div className="flex justify-center p-12">Loading exam papers...</div>}>
          <ExamPaperExplorer />
        </Suspense>
      ) : (
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            {isLoading ? "Loading..." : "Please sign in to access exam papers"}
          </p>
        </div>
      )}
      
      {/* Auth overlay - shows when user is not authenticated */}
      {authOverlay}
    </div>
  );
} 
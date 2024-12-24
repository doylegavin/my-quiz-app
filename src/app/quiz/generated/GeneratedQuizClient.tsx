"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function GeneratedQuizClient() {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("questions") || "{}");

  const [showSolutions, setShowSolutions] = useState(false);
  const questionsArray = data.questions || [];
  const solutionsArray = data.solutions || [];

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [questionsArray, showSolutions]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Generated Questions</h1>
      {questionsArray.length > 0 ? (
        <ul className="space-y-4">
          {questionsArray.map((q: { question: string }, index: number) => (
            <li key={index} className="border p-4 rounded">
              <strong>Question {index + 1}:</strong> {q.question}
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions generated yet.</p>
      )}

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowSolutions(!showSolutions)}
      >
        {showSolutions ? "Hide Solutions" : "Show Solutions"}
      </button>

      {showSolutions && solutionsArray.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Solutions</h2>
          <ul className="space-y-4">
            {solutionsArray.map(
              (
                sol: {
                  questionIndex: number;
                  solution: string;
                  notes: string;
                  markingScheme: string;
                },
                idx: number
              ) => (
                <li key={idx} className="border p-4 rounded">
                  <strong>Solution for Question {sol.questionIndex}:</strong>
                  <p>{sol.solution}</p>
                  <p>
                    <em>Notes:</em> {sol.notes}
                  </p>
                  <p>
                    <em>Marking Scheme:</em> {sol.markingScheme}
                  </p>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

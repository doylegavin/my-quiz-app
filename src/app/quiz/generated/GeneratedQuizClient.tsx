//src/app/quiz/generated/GeneratedQuizClient.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GeneratedQuizClient() {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("questions") || "{}");

  const [showSolutions, setShowSolutions] = useState(false);
  const questionsArray = data.questions || [];
  const solutionsArray = data.solutions || [];
  const metadata = data.metadata || {};

  const router = useRouter();

  // Extract metadata from the response - fallback to search params if metadata not available
  const subject = metadata.subject || "";
  const level = metadata.level || "";
  const difficulty = metadata.difficulty || "Random";
  const paper = metadata.paper || "";
  const sections = metadata.sections || "";
  const topic = metadata.topic || metadata.topics || "Random";
  const subtopic = metadata.subtopic || "";

  // Format subject and difficulty nicely
  const formattedSubject = subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "";
  const formattedDifficulty = difficulty !== "Random" ? `${difficulty} difficulty` : "";

  // Format paper name 
  const formattedPaper = paper === "paper1" ? "Paper 1" : 
                         paper === "paper2" ? "Paper 2" : paper;

  // Construct the selected quiz fields string
  const selectedFields = [
    formattedDifficulty,
    level,
    subtopic || topic, // Show subtopic if available, otherwise show topic
    sections,
    `${formattedPaper}${formattedSubject ? `, ${formattedSubject}` : ''}`
  ].filter(Boolean).join(" • ");

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [questionsArray, showSolutions]);

  return (
    <div className="container mx-auto p-6 pl-16">
      <h1 className="text-2xl font-bold mb-4">
        Generated Questions
      </h1>
      <p className="text-gray-600 mb-8">
        {selectedFields}
      </p>

      {questionsArray.length > 0 ? (
        <ul className="space-y-8">
          {questionsArray.map((q: any, index: number) => (
            <li key={index} className="border p-4 rounded bg-white shadow">
              <strong className="block mb-2 text-lg">Question {index + 1}</strong>
              {/* Use dangerouslySetInnerHTML to render LaTeX properly */}
              <div dangerouslySetInnerHTML={{ __html: q.question }} />
              
              {/* Graph Paper Placeholder */}
              {q.geogebraCommands && (
                <div className="mt-4">
                  <div className="border rounded overflow-hidden bg-gray-50 p-4">
                    <div className="text-center mb-2 text-gray-700 font-medium">Graph Area</div>
                    <div className="w-full h-64 border border-gray-300 bg-white grid" 
                         style={{ 
                           backgroundImage: "linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)",
                           backgroundSize: "20px 20px" 
                         }}>
                      <div className="flex items-center justify-center h-full text-gray-500">
                        Use grid paper to sketch your answer
                      </div>
                    </div>
                    {q.geogebraCommands && (
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="font-medium">Coordinate bounds:</span> {q.geogebraCommands.replace("ZoomIn", "")}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
          <p>No questions generated yet.</p>
        </div>
      )}

      <div className="mt-8 space-x-4">
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md transition-colors"
          onClick={() => setShowSolutions(!showSolutions)}
        >
          {showSolutions ? "Hide Solutions" : "Show Solutions"}
        </button>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md transition-colors"
          onClick={() => router.push("/quiz/create")}
        >
          Generate Another
        </button>
      </div>

      {showSolutions && solutionsArray.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Solutions</h2>
          <ul className="space-y-8">
            {solutionsArray.map(
              (sol: any, idx: number) => (
                <li key={idx} className="border p-5 rounded bg-gray-50 shadow-sm">
                  <strong className="block mb-3 text-lg">Solution for Question {sol.questionIndex}</strong>
                  {/* Use dangerouslySetInnerHTML for LaTeX */}
                  <div 
                    className="mb-3"
                    dangerouslySetInnerHTML={{ __html: sol.solution }} 
                  />
                  
                  {/* Solution Diagram */}
                  {sol.geogebraCommands && (
                    <div className="my-4">
                      <div className="border rounded overflow-hidden bg-gray-50 p-4">
                        <div className="text-center mb-2 text-gray-700 font-medium">Solution Graph</div>
                        <div className="w-full h-64 border border-gray-300 bg-white grid" 
                             style={{ 
                               backgroundImage: "linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)",
                               backgroundSize: "20px 20px" 
                             }}>
                          <div className="flex flex-col items-center justify-center h-full text-gray-700">
                            <p className="font-medium mb-2">Graph of function:</p>
                            <p className="text-blue-600">{sol.geogebraCommands.split(";")[0]}</p>
                            <p className="mt-4 text-sm text-gray-500">Refer to solution details above</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {sol.notes && (
                    <div className="mb-2">
                      <em className="font-medium text-gray-700">Notes:</em>{" "}
                      <span className="text-gray-800">{sol.notes}</span>
                    </div>
                  )}
                  {sol.markingScheme && (
                    <div>
                      <em className="font-medium text-gray-700">Marking Scheme:</em>{" "}
                      <span className="text-gray-800 whitespace-pre-line">{sol.markingScheme.replace(/\\n/g, '\n')}</span>
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
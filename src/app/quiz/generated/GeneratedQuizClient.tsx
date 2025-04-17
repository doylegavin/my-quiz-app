//src/app/quiz/generated/GeneratedQuizClient.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import DiagramRenderer from "@/components/DiagramRenderer";

// Import PDFButton with no SSR to avoid hydration issues
const PDFButton = dynamic(
  () => import('@/components/PDFButton'),
  { ssr: false }
);

// Export this function so it can be used in PDFButton
export function isGraphQuestion(question: string): boolean {
  const graphKeywords = ["graph", "plot", "sketch", "draw"];
  return graphKeywords.some((keyword) =>
    question.toLowerCase().includes(keyword)
  );
}

function parseGeogebraCommand(command: string): any {
  const zoomMatch = command.match(/ZoomIn\(([^,]+),([^,]+),([^,]+),([^,)]+)\)/);
  const diagData = {
    type: "coordinate",
    xMin: 0,
    xMax: 10,
    yMin: -10,
    yMax: 10,
  };
  if (zoomMatch) {
    diagData.xMin = parseFloat(zoomMatch[1]);
    diagData.xMax = parseFloat(zoomMatch[2]);
    diagData.yMin = parseFloat(zoomMatch[3]);
    diagData.yMax = parseFloat(zoomMatch[4]);
  }
  if (command.includes("f(x)=")) {
    const parts = command.split(";");
    const funcPart = parts[0];
    const funcMatch = funcPart.match(/f\(x\)=(.*)/);
    if (funcMatch && funcMatch[1]) {
      return {
        ...diagData,
        functions: [{ equation: funcMatch[1], color: "blue" }],
      };
    }
  }
  return diagData;
}

export default function GeneratedQuizClient() {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("questions") || "{}");

  const [showSolutions, setShowSolutions] = useState(false);
  const [isPreparingPDF, setIsPreparingPDF] = useState(false);
  const questionsArray = data.questions || [];
  const solutionsArray = data.solutions || [];
  const metadata = data.metadata || {};
  
  // Create refs for capturing graph images
  const graphRefs = useRef<Array<HTMLDivElement | null>>([]);
  const solutionGraphRefs = useRef<Array<HTMLDivElement | null>>([]);

  const router = useRouter();

  const subject = metadata.subject || "";
  const level = metadata.level || "";
  const difficulty = metadata.difficulty || "Random";
  const paper = metadata.paper || "";
  const sections = metadata.sections || "";
  const topic = metadata.topic || metadata.topics || "Random";
  const subtopic = metadata.subtopic || "";

  const formattedSubject = subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "";
  const formattedDifficulty = difficulty !== "Random" ? `${difficulty} difficulty` : "";
  const formattedPaper = paper === "paper1" ? "Paper 1" : paper === "paper2" ? "Paper 2" : paper;

  const selectedFields = [
    formattedDifficulty,
    level,
    subtopic || topic,
    sections,
    `${formattedPaper}${formattedSubject ? `, ${formattedSubject}` : ""}`,
  ]
    .filter(Boolean)
    .join(" • ");

  const generatedFilename = `${formattedSubject}${level.includes("Higher") ? "HL" : level.includes("Ordinary") ? "OL" : level.includes("Foundation") ? "FL" : ""}${(subtopic || topic).replace(/\s+/g, "")}${paper && paper !== "Both" ? (paper.includes("paper") ? `P${paper === "paper1" ? "1" : "2"}` : paper.replace(/\s+/g, "")) : ""}${difficulty !== "Random" ? difficulty : ""}${sections ? sections.replace(/\s+/g, "") : ""}.pdf`;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [questionsArray, showSolutions]);

  // Function to handle refs correctly
  const setGraphRef = (index: number) => (el: HTMLDivElement | null) => {
    graphRefs.current[index] = el;
  };

  const setSolutionGraphRef = (index: number) => (el: HTMLDivElement | null) => {
    solutionGraphRefs.current[index] = el;
  };

  return (
    <div className="container mx-auto p-6 pl-16">
      <h1 className="text-2xl font-bold mb-4">Generated Questions</h1>
      <p className="text-gray-600 mb-8">{selectedFields}</p>

      {questionsArray.length > 0 ? (
        <ul className="space-y-8">
          {questionsArray.map((q: any, index: number) => (
            <li key={index} className="border p-4 rounded bg-white shadow">
              <strong className="block mb-2 text-lg">Question {index + 1}</strong>
              <div dangerouslySetInnerHTML={{ __html: q.question }} />
              {q.geogebraCommands && (
                <div 
                  ref={setGraphRef(index)}
                  className="mt-4"
                >
                  <div className="border rounded overflow-hidden p-2">
                    {isGraphQuestion(q.question) ? (
                      <div className="bg-white">
                        <DiagramRenderer
                          diagramData={q.diagram || parseGeogebraCommand(q.geogebraCommands)}
                          showSolution={false}
                          width={680}
                          height={450}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-64 border border-gray-300 bg-white"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
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

      <div className="mt-8 flex flex-wrap gap-3 items-center justify-start">
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md transition-colors"
          onClick={() => setShowSolutions((prev) => !prev)}
        >
          {showSolutions ? "Hide Solutions" : "Show Solutions"}
        </button>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md transition-colors"
          onClick={() => router.push("/quiz/create")}
        >
          Generate Another
        </button>
        
        <PDFButton 
          questionsArray={questionsArray}
          solutionsArray={solutionsArray}
          selectedFields={selectedFields}
          generatedFilename={generatedFilename}
          graphRefs={graphRefs}
          solutionGraphRefs={solutionGraphRefs}
          showSolutions={showSolutions}
          setShowSolutions={setShowSolutions}
        />
      </div>

      {showSolutions && solutionsArray.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Solutions</h2>
          <ul className="space-y-8">
            {solutionsArray.map((sol: any, idx: number) => {
              const questionIndex = sol.questionIndex - 1;
              return (
                <li key={idx} className="border p-5 rounded bg-gray-50 shadow-sm">
                  <strong className="block mb-3 text-lg">Solution for Question {sol.questionIndex}</strong>
                  <div className="mb-3" dangerouslySetInnerHTML={{ __html: sol.solution }} />
                  {sol.geogebraCommands &&
                    isGraphQuestion(sol.solution || questionsArray[questionIndex]?.question || "") && (
                      <div 
                        ref={setSolutionGraphRef(questionIndex)}
                        className="my-4"
                      >
                        <div className="border rounded overflow-hidden p-2">
                          <div className="text-center mb-2 text-gray-700 font-medium">Solution</div>
                          <div className="bg-white">
                            <DiagramRenderer
                              diagramData={sol.diagram || parseGeogebraCommand(sol.geogebraCommands)}
                              showSolution={true}
                              width={680}
                              height={450}
                            />
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
                      <span className="text-gray-800 whitespace-pre-line">
                        {sol.markingScheme.replace(/\\n/g, "\n")}
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
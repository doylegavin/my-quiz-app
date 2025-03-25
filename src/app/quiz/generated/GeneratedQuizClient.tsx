//src/app/quiz/generated/GeneratedQuizClient.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DiagramRenderer from "@/components/DiagramRenderer";
import QuizPDFDocument from "@/components/QuizPDFDocument";
import html2canvas from "html2canvas";
// Remove the PDFDownloadLink import which is causing issues

function isGraphQuestion(question: string): boolean {
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

  const generatedFilename = `Maths${level === "higher" ? "HL" : "OL"}${(subtopic || topic).replace(/\s+/g, "")}P${paper === "paper1" ? "1" : "2"}${difficulty !== "Random" ? difficulty : ""}LongQs.pdf`;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [questionsArray, showSolutions]);

  // Function to prepare PDF data with graph images
  const preparePDFData = async () => {
    try {
      const enrichedQuestions = await Promise.all(
        questionsArray.map(async (q: any, index: number) => {
          const ref = graphRefs.current[index];
          if (ref && isGraphQuestion(q.question)) {
            // Find the actual diagram element (one level deeper than the container)
            const diagramElement = ref.querySelector('.bg-white') as HTMLElement;
            const targetElement = diagramElement || ref;
            
            const canvas = await html2canvas(targetElement, {
              backgroundColor: "white",
              scale: 2, // Higher resolution
              logging: false,
              useCORS: true
            });
            
            const imageData = canvas.toDataURL("image/png");
            return { ...q, diagramImage: imageData };
          }
          return q;
        })
      );

      const enrichedSolutions = await Promise.all(
        solutionsArray.map(async (sol: any) => {
          const questionIndex = sol.questionIndex - 1;
          const ref = solutionGraphRefs.current[questionIndex];
          if (ref && isGraphQuestion(sol.solution || questionsArray[questionIndex]?.question || "")) {
            // Find the actual diagram element (one level deeper than the container)
            const diagramElement = ref.querySelector('.bg-white') as HTMLElement;
            const targetElement = diagramElement || ref;
            
            const canvas = await html2canvas(targetElement, {
              backgroundColor: "white",
              scale: 2, // Higher resolution
              logging: false,
              useCORS: true
            });
            
            const imageData = canvas.toDataURL("image/png");
            return { ...sol, diagramImage: imageData };
          }
          return sol;
        })
      );

      return { enrichedQuestions, enrichedSolutions };
    } catch (error) {
      console.error("Error preparing PDF data:", error);
      return { enrichedQuestions: questionsArray, enrichedSolutions: solutionsArray };
    }
  };

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
        
        <button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium shadow-md transition-colors flex items-center justify-center min-w-[150px]"
          onClick={async () => {
            if (isPreparingPDF) return;
            
            setIsPreparingPDF(true);
            try {
              // Temporarily show solutions if they're hidden (to capture solution graphs)
              const solutionsWereHidden = !showSolutions;
              if (solutionsWereHidden) {
                setShowSolutions(true);
                // Wait for solutions to render
                await new Promise(resolve => setTimeout(resolve, 500));
              }
              
              // Prepare the enhanced data with graphs
              const { enrichedQuestions, enrichedSolutions } = await preparePDFData();
              
              // Hide solutions again if they were initially hidden
              if (solutionsWereHidden) {
                setShowSolutions(false);
              }
              
              // Create a PDF download link component temporarily
              const pdfContainer = document.createElement('div');
              document.body.appendChild(pdfContainer);
              
              // Handle PDF generation with proper error catching
              try {
                // Dynamically import all needed components from react-pdf
                const ReactPDF = await import('@react-pdf/renderer');
                
                // Generate the PDF document and convert to blob
                const blob = await ReactPDF.pdf(
                  <QuizPDFDocument
                    questions={enrichedQuestions}
                    solutions={enrichedSolutions}
                    selectedFields={selectedFields}
                  />
                ).toBlob();
                
                // Create download link for the blob and trigger click
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = generatedFilename;
                document.body.appendChild(link);
                link.click();
                
                // Clean up
                setTimeout(() => {
                  URL.revokeObjectURL(url);
                  document.body.removeChild(link);
                  if (document.body.contains(pdfContainer)) {
                    document.body.removeChild(pdfContainer);
                  }
                }, 100);
              } catch (pdfError) {
                console.error("PDF generation error:", pdfError);
                alert("Could not generate the PDF. Please try again.");
              }
            } catch (err) {
              console.error("Error generating PDF:", err);
              alert("There was an error generating the PDF. Please try again.");
            } finally {
              setIsPreparingPDF(false);
            }
          }}
        >
          {isPreparingPDF ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Preparing PDF...
            </> 
          ) : (
            "Download PDF"
          )}
        </button>
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
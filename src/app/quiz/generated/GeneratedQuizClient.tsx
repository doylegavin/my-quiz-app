//src/app/quiz/generated/GeneratedQuizClient.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import DiagramRenderer from "@/components/DiagramRenderer";
import { useFormattedQuizStore } from "@/stores/useFormattedQuizStore";

// Import PDFButton with no SSR to avoid hydration issues
const PDFButton = dynamic(
  () => import('@/components/PDFButton').catch(err => {
    console.error("Error loading PDFButton:", err);
    // Return a minimal fallback component
    return () => (
      <button
        className="px-6 py-2 bg-gray-500 text-white rounded-md font-medium shadow-md cursor-not-allowed opacity-60"
        disabled
      >
        PDF Generation Unavailable
      </button>
    );
  }),
  { 
    ssr: false,
    loading: () => (
      <button
        className="px-6 py-2 bg-gray-400 text-white rounded-md font-medium shadow-md cursor-wait"
        disabled
      >
        Loading PDF Button...
      </button>
    )
  }
);

// Export this function so it can be used in PDFButton
export function isGraphQuestion(question: string): boolean {
  const graphKeywords = ["graph", "plot", "sketch", "draw"];
  return graphKeywords.some((keyword) =>
    question.toLowerCase().includes(keyword)
  );
}

// Sample quiz data for when DB is unavailable
function getSampleQuizById(id: string) {
  // Sample quizzes with their respective IDs
  const sampleQuizzes = {
    "sample-math-1": {
      id: "sample-math-1",
      title: "Sample Mathematics Quiz",
      subject: "mathematics",
      level: "Higher Level",
      difficulty: "Medium",
      topic: "Algebra",
      questions: [
        { 
          id: "q1", 
          question: "Solve for x: 2x + 5 = 13", 
          solution: "2x + 5 = 13\n2x = 8\nx = 4" 
        },
        { 
          id: "q2", 
          question: "Find the derivative of f(x) = x^3 + 2x^2 - 4x + 7", 
          solution: "f'(x) = 3x^2 + 4x - 4" 
        },
        { 
          id: "q3", 
          question: "Factorise the expression: x^2 - 9", 
          solution: "x^2 - 9 = (x + 3)(x - 3)" 
        }
      ]
    },
    "sample-physics-1": {
      id: "sample-physics-1",
      title: "Physics Forces Quiz",
      subject: "physics",
      level: "Higher Level",
      difficulty: "Hard",
      topic: "Forces",
      questions: [
        { 
          id: "q1", 
          question: "Calculate the force required to accelerate a 2kg mass at 5 m/s².", 
          solution: "F = ma\nF = 2kg × 5m/s²\nF = 10N" 
        },
        { 
          id: "q2", 
          question: "A 50kg object is sliding down a frictionless incline at 30° to the horizontal. Calculate the component of weight acting down the incline.", 
          solution: "Component = mg × sin(θ)\nComponent = 50kg × 9.8m/s² × sin(30°)\nComponent = 50kg × 9.8m/s² × 0.5\nComponent = 245N" 
        }
      ]
    },
    "sample-bio-1": {
      id: "sample-bio-1",
      title: "Biology Revision Quiz",
      subject: "biology",
      level: "Ordinary Level",
      difficulty: "Easy",
      topic: "Cells",
      questions: [
        { 
          id: "q1", 
          question: "What is the function of mitochondria in a cell?", 
          solution: "Mitochondria are the powerhouses of the cell. They generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy." 
        },
        { 
          id: "q2", 
          question: "Explain the difference between prokaryotic and eukaryotic cells.", 
          solution: "Prokaryotic cells lack a nucleus and membrane-bound organelles, while eukaryotic cells have a nucleus and membrane-bound organelles. Prokaryotes are typically smaller and simpler than eukaryotes." 
        },
        { 
          id: "q3", 
          question: "What is osmosis?", 
          solution: "Osmosis is the movement of water molecules from a region of high water concentration to a region of low water concentration through a selectively permeable membrane." 
        },
        { 
          id: "q4", 
          question: "Name three organelles found in a plant cell but not in an animal cell.", 
          solution: "1. Cell wall\n2. Chloroplasts\n3. Large central vacuole" 
        }
      ]
    }
  };
  
  // Return the sample quiz if it exists
  return sampleQuizzes[id as keyof typeof sampleQuizzes];
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
  // -------------------- STATE AND REFS --------------------
  // Extract search parameters - always runs
  const searchParams = useSearchParams();
  const quizId = searchParams.get("id");
  const urlDataParam = searchParams.get("questions");
  const urlData = urlDataParam ? JSON.parse(urlDataParam) : null;
  
  // Hooks for local state - always defined in the same order
  const [showSolutions, setShowSolutions] = useState(false);
  const [isPreparingPDF, setIsPreparingPDF] = useState(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  
  // Refs - always declared
  const graphRefs = useRef<Array<HTMLDivElement | null>>([]);
  const solutionGraphRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Router - always used
  const router = useRouter();
  
  // Store data - always accessed
  const { 
    quizId: storeQuizId,
    quizSubject,
    quizLevel,
    quizDifficulty,
    quizQuestions,
    fetchQuizById,
    isLoading: storeLoading,
    error 
  } = useFormattedQuizStore();
  
  // -------------------- DATA PREPARATION --------------------
  // Prepare data from sources - always computed
  const data = useMemo(() => {
    if (urlData) {
      // Use URL data if available
      return urlData;
    } else if (quizQuestions.length > 0) {
      // Use Zustand store data
      return {
        questions: quizQuestions.map((q: any) => ({
          question: q.question,
          id: q.id,
          geogebraCommands: ""
        })),
        solutions: quizQuestions.map((q: any, i: number) => ({
          questionIndex: i + 1,
          solution: q.solution
        })),
        metadata: {
          subject: quizSubject,
          level: quizLevel,
          difficulty: quizDifficulty,
          topic: quizQuestions[0]?.topic || "Random"
        }
      };
    } else {
      // No data available
      return { questions: [], solutions: [], metadata: {} };
    }
  }, [urlData, quizQuestions, quizSubject, quizLevel, quizDifficulty]);
  
  // Extract data for rendering - always extracted
  const questionsArray = data.questions || [];
  const solutionsArray = data.solutions || [];
  const metadata = data.metadata || {};
  
  const subject = metadata.subject || "";
  const level = metadata.level || "";
  const difficulty = metadata.difficulty || "Random";
  const paper = metadata.paper || "";
  const sections = metadata.sections || "";
  const topic = metadata.topic || metadata.topics || "Random";
  const subtopic = metadata.subtopic || "";

  // Format data for display
  const formattedSubject = subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "";
  const formattedDifficulty = difficulty !== "Random" ? `${difficulty} difficulty` : "";
  const formattedPaper = paper === "paper1" ? "Paper 1" : paper === "paper2" ? "Paper 2" : paper;

  // Prepare display fields
  const selectedFields = useMemo(() => {
    return [
      formattedDifficulty,
      level,
      subtopic || topic,
      sections,
      `${formattedPaper}${formattedSubject ? `, ${formattedSubject}` : ""}`,
    ]
    .filter(Boolean)
    .join(" • ");
  }, [formattedDifficulty, level, subtopic, topic, sections, formattedPaper, formattedSubject]);

  const generatedFilename = useMemo(() => {
    return `${formattedSubject}${level.includes("Higher") ? "HL" : level.includes("Ordinary") ? "OL" : level.includes("Foundation") ? "FL" : ""}${(subtopic || topic).replace(/\s+/g, "")}${paper && paper !== "Both" ? (paper.includes("paper") ? `P${paper === "paper1" ? "1" : "2"}` : paper.replace(/\s+/g, "")) : ""}${difficulty !== "Random" ? difficulty : ""}${sections ? sections.replace(/\s+/g, "") : ""}.pdf`;
  }, [formattedSubject, level, subtopic, topic, paper, difficulty, sections]);
  
  // -------------------- EFFECTS --------------------
  // Effect to fetch quiz data - always declared
  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId || urlData) return;
      
      try {
        // Try to load sample quiz
        if (quizId.startsWith('sample-')) {
          const sampleQuiz = getSampleQuizById(quizId);
          if (sampleQuiz) {
            useFormattedQuizStore.setState({
              quizId: sampleQuiz.id,
              quizTitle: sampleQuiz.title,
              quizSubject: sampleQuiz.subject,
              quizLevel: sampleQuiz.level,
              quizDifficulty: sampleQuiz.difficulty,
              quizQuestions: sampleQuiz.questions.map((q: any) => ({
                id: q.id,
                question: q.question,
                solution: q.solution,
                subject: sampleQuiz.subject,
                level: sampleQuiz.level
              })),
              isLoading: false,
              error: null
            });
            return;
          }
        }
        
        // Fetch from database
        setIsLoadingQuiz(true);
        await fetchQuizById(quizId);
      } catch (error) {
        console.error("Error loading quiz:", error);
        useFormattedQuizStore.setState({
          error: "Failed to load quiz data"
        });
      } finally {
        setIsLoadingQuiz(false);
      }
    };
    
    loadQuiz();
  }, [quizId, urlData, fetchQuizById]);
  
  // Effect for MathJax rendering - always declared
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise?.();
    }
  }, [questionsArray, showSolutions]);
  
  // -------------------- CALLBACK FUNCTIONS --------------------
  // Handle graph refs - always defined
  const setGraphRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    graphRefs.current[index] = el;
  }, []);

  const setSolutionGraphRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    solutionGraphRefs.current[index] = el;
  }, []);

  // Topic matching logic - always defined
  const validateTopicMatch = useCallback(() => {
    if (!topic || topic === "Random") return null;
    
    // Keywords to look for based on topic
    const topicKeywords: Record<string, string[]> = {
      "Coordinate Geometry": ["coordinate", "line", "point", "equation of", "slope", "parallel", "perpendicular", "midpoint", "distance"],
      "The Line": ["slope", "gradient", "line", "parallel", "perpendicular", "equation of", "y=mx+c", "ax+by+c=0"],
      "Algebra": ["equation", "expression", "factor", "solve", "polynomial", "quadratic", "cubic"],
      "Statistics": ["mean", "median", "mode", "standard deviation", "probability", "distribution"],
      "Calculus": ["derivative", "differentiate", "integrate", "integral", "maximum", "minimum"]
    };
    
    // Find which keywords match our topic
    let keywordsToCheck: string[] = [];
    const normalizedTopic = topic.toLowerCase();
    
    for (const [topicName, keywords] of Object.entries(topicKeywords)) {
      if (normalizedTopic.includes(topicName.toLowerCase())) {
        keywordsToCheck.push(...keywords);
      }
    }
    
    if (keywordsToCheck.length === 0) return null;
    
    // Count how many questions contain topic keywords
    let matchingQuestions = 0;
    questionsArray.forEach((q: any) => {
      const questionText = q.question.toLowerCase();
      if (keywordsToCheck.some(keyword => questionText.includes(keyword.toLowerCase()))) {
        matchingQuestions++;
      }
    });
    
    // If less than half the questions match the topic, show a warning
    if (matchingQuestions < questionsArray.length / 2) {
      return (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-800">
          <p className="font-medium">⚠️ Some questions may not match the requested topic: {topic}</p>
          <p className="text-sm mt-1">Only {matchingQuestions} out of {questionsArray.length} questions appear to be related to this topic.</p>
        </div>
      );
    }
    
    return null;
  }, [topic, questionsArray]);
  
  // -------------------- RENDER FUNCTIONS --------------------
  // Render loading state
  const renderLoading = () => (
    <div className="container mx-auto p-6 pl-16">
      <h1 className="text-2xl font-bold mb-4">Loading Quiz...</h1>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
      </div>
    </div>
  );
  
  // Render error state
  const renderError = () => (
    <div className="container mx-auto p-6 pl-16">
      <h1 className="text-2xl font-bold mb-4">Error Loading Quiz</h1>
      <div className="bg-red-50 border border-red-200 p-4 rounded">
        <p className="text-red-600">{error}</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md transition-colors"
          onClick={() => router.push("/quiz/create")}
        >
          Create New Quiz
        </button>
      </div>
    </div>
  );
  
  // Render a single question and its solution
  const renderQuestion = (q: any, index: number) => {
    // Find the corresponding solution by questionIndex
    const solution = solutionsArray.find((sol: any) => sol.questionIndex === index + 1);
    const questionIndex = index;
    
    return (
      <div key={index} className="space-y-4">
        {/* Question */}
        <div className="border p-4 rounded bg-white shadow">
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
        </div>
        
        {/* Solution - only shown when showSolutions is true */}
        {showSolutions && solution && (
          <div className="border p-5 rounded bg-gray-50 shadow-sm ml-8">
            <strong className="block mb-3 text-lg">Solution for Question {index + 1}</strong>
            <div className="mb-3" dangerouslySetInnerHTML={{ __html: solution.solution }} />
            {solution.geogebraCommands &&
              isGraphQuestion(solution.solution || q.question || "") && (
                <div 
                  ref={setSolutionGraphRef(questionIndex)}
                  className="my-4"
                >
                  <div className="border rounded overflow-hidden p-2">
                    <div className="text-center mb-2 text-gray-700 font-medium">Solution</div>
                    <div className="bg-white">
                      <DiagramRenderer
                        diagramData={solution.diagram || parseGeogebraCommand(solution.geogebraCommands)}
                        showSolution={true}
                        width={680}
                        height={450}
                      />
                    </div>
                  </div>
                </div>
              )}
            {solution.notes && (
              <div className="mb-2">
                <em className="font-medium text-gray-700">Notes:</em>{" "}
                <span className="text-gray-800">{solution.notes}</span>
              </div>
            )}
            {solution.markingScheme && (
              <div>
                <em className="font-medium text-gray-700">Marking Scheme:</em>{" "}
                <span className="text-gray-800 whitespace-pre-line">
                  {solution.markingScheme.replace(/\\n/g, "\n")}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  // -------------------- MAIN RENDER --------------------
  // This will allow us to conditionally render content without breaking hook rules
  const content = useMemo(() => {
    if (isLoadingQuiz || storeLoading) {
      return renderLoading();
    }
    
    if (error && !urlData && quizQuestions.length === 0) {
      return renderError();
    }
    
    return (
      <div className="container mx-auto p-6 pl-16">
        <h1 className="text-2xl font-bold mb-4">Generated Questions</h1>
        <p className="text-gray-600 mb-4">{selectedFields}</p>
        
        {validateTopicMatch()}

        <div className="mb-8 flex flex-wrap gap-3 items-center justify-start">
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
          
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md transition-colors"
            onClick={() => router.push("/quizzes")}
          >
            Browse All Quizzes
          </button>
        </div>

        {questionsArray.length > 0 ? (
          <div className="space-y-8">
            {questionsArray.map(renderQuestion)}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
            <p>No questions generated yet.</p>
          </div>
        )}
      </div>
    );
  }, [
    isLoadingQuiz, 
    storeLoading, 
    error, 
    urlData, 
    quizQuestions, 
    selectedFields, 
    validateTopicMatch, 
    showSolutions, 
    questionsArray, 
    solutionsArray, 
    generatedFilename, 
    router
  ]);
  
  return content;
}
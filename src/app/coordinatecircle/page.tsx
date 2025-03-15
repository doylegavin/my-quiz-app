//src/app/coordinatecircle/page.tsx

"use client";


import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import CoordinateCircle from '@/components/CoordinateCircle';
import MathDiagramForm from '@/components/MathDiagramForm';
// This type represents data we might receive from an AI API
interface MathProblemData {
  type: 'circle' | 'line' | 'function' | 'complex';
  parameters: {
    // Circle parameters
    centerX?: number;
    centerY?: number;
    radius?: number;
    
    // Line parameters
    slope?: number;
    yIntercept?: number;
    
    // Function parameters
    functionType?: string;
    a?: number;
    b?: number;
    c?: number;
    
    // Complex number parameters
    real?: number;
    imaginary?: number;
  };
  question: string;
}

// Mock API function - this would be replaced with your actual API call
const fetchMathProblemFromAPI = async (): Promise<MathProblemData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This is mock data - in a real app, this would come from your AI API
  return {
    type: 'circle',
    parameters: {
      centerX: 4,
      centerY: -1,
      radius: 3
    },
    question: "A different circle has centre (4, −1) and radius 3. Construct this circle on the co-ordinate diagram below."
  };
};

// Parse an AI response to extract math problem data
const parseMathProblemFromAIResponse = (response: string): MathProblemData | null => {
  // This is a simple example - in reality, you'd need more robust parsing
  // or structured output from your AI model
  
  try {
    // Check for circle pattern: "circle with center/centre (x, y) and radius r"
    const circlePattern = /circle has cent(?:er|re) \((-?\d+),\s*(-?\d+)\) and radius (\d+)/i;
    const circleMatch = response.match(circlePattern);
    
    if (circleMatch) {
      return {
        type: 'circle',
        parameters: {
          centerX: parseInt(circleMatch[1], 10),
          centerY: parseInt(circleMatch[2], 10),
          radius: parseInt(circleMatch[3], 10)
        },
        question: response
      };
    }
    
    // Add more patterns for other types of problems
    
    return null;
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return null;
  }
};

const MathDiagramPage: NextPage = () => {
  const [diagramType, setDiagramType] = useState<'circle' | 'line' | 'function' | 'complex'>('circle');
  const [diagramData, setDiagramData] = useState({
    centerX: 4,
    centerY: -1,
    radius: 3,
    showSolution: true
  });
  const [question, setQuestion] = useState<string>("");
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [apiInput, setApiInput] = useState<string>("");

  // Load initial data from mock API
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await fetchMathProblemFromAPI();
        setDiagramType(data.type);
        setDiagramData({
          ...diagramData,
          ...data.parameters
        });
        setQuestion(data.question);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };
    
    loadInitialData();
  }, []);

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    setDiagramData(data);
  };

  // Parse API input
  const handleParseApiInput = () => {
    const parsedData = parseMathProblemFromAIResponse(apiInput);
    if (parsedData) {
      setDiagramType(parsedData.type);
      setDiagramData({
        ...diagramData,
        ...parsedData.parameters
      });
      setQuestion(parsedData.question);
    } else {
      alert("Could not parse math problem from input text. Try a different format.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mathematical Diagrams</h1>
      
      <div className="bg-gray-100 p-4 mb-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Current Question:</h2>
        <p className="mb-4">{question || "No question loaded"}</p>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={manualMode}
              onChange={(e) => setManualMode(e.target.checked)}
              className="mr-2"
            />
            Manual Input Mode
          </label>
        </div>
        
        {manualMode && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Parse from AI Response:</h3>
            <textarea
              value={apiInput}
              onChange={(e) => setApiInput(e.target.value)}
              placeholder="Paste the AI-generated math problem here..."
              className="w-full p-2 border rounded h-32 mb-2"
            />
            <button
              onClick={handleParseApiInput}
              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
            >
              Parse Input
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="mb-4">
            <label className="block mb-1">Diagram Type:</label>
            <select
              value={diagramType}
              onChange={(e) => setDiagramType(e.target.value as any)}
              className="w-full p-2 border rounded"
            >
              <option value="circle">Circle</option>
              <option value="line">Line</option>
              <option value="function">Function</option>
              <option value="complex">Complex Number</option>
            </select>
          </div>
          
          <MathDiagramForm
            diagramType={diagramType}
            onSubmit={handleFormSubmit}
            defaultValues={diagramData}
          />
          
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="font-medium mb-2">API Integration:</h3>
            <p className="text-sm mb-4">
              In a production environment, you would connect to your OpenAI API endpoint
              to receive math problems. The app would parse the response to extract
              the diagram parameters.
            </p>
            <code className="block bg-gray-800 text-white p-3 rounded text-sm overflow-auto">
              {`
// Example pseudocode for API integration
async function getMathProblem() {
  const response = await fetch('/api/generate-math-problem', {
    method: 'POST',
    body: JSON.stringify({
      prompt: "Generate a coordinate geometry problem"
    })
  });
  
  const data = await response.json();
  const mathProblem = parseMathProblemFromAIResponse(data.text);
  
  // Update state with the parsed problem
  setDiagramType(mathProblem.type);
  setDiagramData(mathProblem.parameters);
  setQuestion(mathProblem.question);
}
              `}
            </code>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student View (Empty Grid) */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Student View:</h3>
              {diagramType === 'circle' && (
                <CoordinateCircle
                  centerX={diagramData.centerX}
                  centerY={diagramData.centerY}
                  radius={diagramData.radius}
                  showSolution={false}
                />
              )}
              {/* Add other diagram components as needed */}
            </div>
            
            {/* Solution View */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Solution View:</h3>
              {diagramType === 'circle' && (
                <CoordinateCircle
                  centerX={diagramData.centerX}
                  centerY={diagramData.centerY}
                  radius={diagramData.radius}
                  showSolution={true}
                />
              )}
              {/* Add other diagram components as needed */}
            </div>
          </div>
          
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Generated Code for Export:</h3>
            <p className="mb-2 text-sm">This code could be exported and used in your application:</p>
            <code className="block bg-gray-800 text-white p-3 rounded text-sm overflow-auto">
              {`
<CoordinateCircle
  centerX={${diagramData.centerX}}
  centerY={${diagramData.centerY}}
  radius={${diagramData.radius}}
  showSolution={true}
  width={600}
  height={500}
/>
              `}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathDiagramPage;
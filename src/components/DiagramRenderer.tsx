// src/app/components/DiagramRenderer.tsx

"use client";

import React from 'react';
import UniversalDiagram, { Point, DiagramElement } from './UniversalDiagram';

// Define the interface for diagram data
interface DiagramData {
  type: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  functions?: Array<{
    equation: string;
    color: string;
  }>;
  specialPoints?: Array<{
    x: number;
    y: number;
    label?: string;
    color?: string;
  }>;
}

interface DiagramRendererProps {
    diagramData?: DiagramData;
    showSolution: boolean;
    width?: number;
    height?: number;
    basicGrid?: boolean; // New option to just show a basic grid
  }

const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  diagramData,
  showSolution = false,
  width = 600,
  height = 400,
  basicGrid = false

}) => {
  // If no diagram data, return a basic grid
  if (!diagramData) {
    return (
      <div 
        className="w-full h-64 border border-gray-300 bg-white" 
        style={{ 
          backgroundImage: "linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)",
          backgroundSize: "20px 20px" 
        }}
      />
    );
  }

  if (basicGrid) {
    return (
      <div 
        className="w-full h-64 border border-gray-300 bg-white" 
        style={{ 
          backgroundImage: "linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    );
  }

  // For coordinate system diagrams
  if (diagramData.type === "coordinate") {
    // Prepare points and elements for UniversalDiagram
    const points: Record<string, Point> = {};
    const elements: DiagramElement[] = [];

    // If in solution mode and there are functions, create line elements
    if (showSolution && diagramData.functions && diagramData.functions.length > 0) {
      diagramData.functions.forEach((func: { equation: string; color: string }, index: number) => {
        // Generate more points for a smoother curve
        const numPoints = 50; // More points for better curve representation
        const xStep = (diagramData.xMax - diagramData.xMin) / (numPoints - 1);
        
        let prevPointId: string | null = null;
        
        // Generate multiple points along the function curve
        for (let i = 0; i < numPoints; i++) {
          const x = diagramData.xMin + i * xStep;
          const y = evalFunction(func.equation, x);
          
          // Skip points where the function is undefined or NaN
          if (isNaN(y) || !isFinite(y)) continue;
          
          const pointId = `func-${index}-point-${i}`;
          
          // Add point to points object (invisible)
          points[pointId] = {
            id: pointId,
            x,
            y,
            visible: false // Hide the points, just show the connected curve
          };
          
          // Connect to previous point with a line
          if (prevPointId) {
            elements.push({
              id: `func-${index}-line-${i}`,
              type: 'line',
              point1Id: prevPointId,
              point2Id: pointId,
              style: { 
                stroke: func.color || 'blue', 
                strokeWidth: 2 
              }
            });
          }
          
          prevPointId = pointId;
        }
      });
    }
    
    // Add special points (like roots, intercepts, etc.)
    if (showSolution && diagramData.specialPoints) {
      diagramData.specialPoints.forEach((point, index) => {
        const pointId = `special-point-${index}`;
        points[pointId] = {
          id: pointId,
          x: point.x,
          y: point.y,
          label: point.label,
          visible: true,
          style: {
            fill: point.color || 'red',
            stroke: 'black',
            strokeWidth: 1
          }
        };
      });
    }

    return (
      <UniversalDiagram
        width={width}
        height={height}
        showGrid={true}
        showAxes={true}
        xRange={[diagramData.xMin, diagramData.xMax]}
        yRange={[diagramData.yMin, diagramData.yMax]}
        points={points}
        elements={elements}
        showSolution={showSolution}
        showLabels={true}
      />
    );
  }

  // Fallback for unknown diagram types
  return (
    <div className="w-full h-64 flex items-center justify-center border border-gray-300 bg-gray-50">
      <p className="text-gray-500">Unsupported diagram type: {diagramData.type}</p>
    </div>
  );
};

// Helper function to evaluate a function equation at a specific x value
function evalFunction(equation: string, x: number): number {
  try {
    // Remove all spaces for easier parsing
    equation = equation.replace(/\s+/g, '');
    
    // Handle square root: sqrt(x) or √x
    if (equation.includes("sqrt(") || equation.includes("√")) {
      const sqrtMatch = equation.match(/sqrt\(([^)]+)\)/) || equation.match(/√([^+\-*/]+)/);
      if (sqrtMatch && sqrtMatch[1]) {
        const innerExpr = sqrtMatch[1];
        // Recursively evaluate the inner expression
        const innerValue = evalFunction(innerExpr, x);
        return Math.sqrt(innerValue);
      }
    }

     // Handle cubic functions of form ax^3 + bx^2 + cx + d
     const cubicMatch = equation.match(/^([-+]?\d*\.?\d*)x\^3([-+]\d*\.?\d*)x\^2([-+]\d*\.?\d*)x([-+]\d*\.?\d*)$/);
     if (cubicMatch) {
       const a = parseFloat(cubicMatch[1] || "1");
       const b = parseFloat(cubicMatch[2] || "0");
       const c = parseFloat(cubicMatch[3] || "0");
       const d = parseFloat(cubicMatch[4] || "0");
       return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
     }
     
     // Handle 1/x format (from previous implementation)
     if (equation.includes('/x')) {
       // Avoid division by zero with a small epsilon
       if (Math.abs(x) < 0.001) {
         // Determine sign
         const numeratorIsPositive = !equation.startsWith('-');
         return (x > 0 ? 1 : -1) * (numeratorIsPositive ? 1000 : -1000);
       }
     }

     // Handle general division expressions with x in denominator
     if (equation.includes('/x')) {
        // Avoid division by zero with a small epsilon
        if (Math.abs(x) < 0.001) {
          // Determine sign based on the expression and the sign of x
          const numeratorIsPositive = !equation.startsWith('-');
          return (x > 0 ? 1 : -1) * (numeratorIsPositive ? 1000 : -1000);
        }
      }
    
    // Handle exponents like x^(1/2) (square root) or x^(1/3) (cube root)
    if (equation.includes("x^(1/2)") || equation.includes("x^0.5")) {
      return Math.sqrt(x);
    }
    
    if (equation.includes("x^(1/3)")) {
      return Math.cbrt(x);
    }
    
    // Handle x^n
    const powerMatch = equation.match(/x\^(\d+(\.\d+)?)/);
    if (powerMatch) {
      const power = parseFloat(powerMatch[1]);
      return Math.pow(x, power);
    }
    
    // Handle standard quadratic: ax^2 + bx + c
    const quadraticMatch = equation.match(/^([-+]?\d*\.?\d*)x\^2([-+]\d*\.?\d*)x([-+]\d*\.?\d*)$/);
    if (quadraticMatch) {
      const a = parseFloat(quadraticMatch[1] || "1");
      const b = parseFloat(quadraticMatch[2] || "0");
      const c = parseFloat(quadraticMatch[3] || "0");
      return a * x * x + b * x + c;
    }
    
    // Handle linear equations: mx + b
    const linearMatch = equation.match(/^([-+]?\d*\.?\d*)x([-+]\d*\.?\d*)$/);
    if (linearMatch) {
      const m = parseFloat(linearMatch[1] || "1");
      const b = parseFloat(linearMatch[2] || "0");
      return m * x + b;
    }
    
    // Handle just mx (no constant term)
    const mxMatch = equation.match(/^([-+]?\d*\.?\d*)x$/);
    if (mxMatch) {
      const m = parseFloat(mxMatch[1] || "1");
      return m * x;
    }
    
    // Handle just x (coefficient of 1)
    if (equation === "x") {
      return x;
    }
    
    // Handle just constant
    const constMatch = equation.match(/^([-+]?\d*\.?\d*)$/);
    if (constMatch) {
      return parseFloat(constMatch[1]);
    }
    
     // Handle fractions like "1/x" or "a/x" or "a/(bx+c)"
     const fractionMatch = equation.match(/^([-+]?\d*\.?\d*)\/(.+)$/);
     if (fractionMatch) {
       const numerator = parseFloat(fractionMatch[1] || "1");
       const denominator = fractionMatch[2];
       
       // Evaluate the denominator
       let denomValue;
       
       // If denominator is just "x"
       if (denominator === "x") {
         denomValue = x;
       } else {
         // For more complex denominators, recursively evaluate
         // This is a simplified approach and may not handle all cases
         denomValue = evalFunction(denominator, x);
       }
       
       // Avoid division by zero
       if (Math.abs(denomValue) < 0.001) {
         return (denomValue > 0 ? 1 : -1) * (numerator > 0 ? 1000 : -1000);
       }
       
       return numerator / denomValue;
     }
    // If we can't parse it, log a warning and return 0
    console.warn(`Could not parse equation: ${equation}`);
    return 0;
  } catch (e) {
    console.error(`Error evaluating equation ${equation} at x=${x}:`, e);
    return 0;
  }
}

// Helper function to parse GeoGebra commands into our diagram format
export function parseGeogebraCommand(command: string): DiagramData | null {
  if (!command) return null;
  
  // Extract coordinates from ZoomIn command
  const zoomMatch = command.match(/ZoomIn\(([^,]+),([^,]+),([^,]+),([^,)]+)\)/);
  
  // Default diagram data
  const diagramData: DiagramData = {
    type: "coordinate",
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10
  };
  
  // Set coordinate ranges if ZoomIn was found
  if (zoomMatch) {
    diagramData.xMin = parseFloat(zoomMatch[1]);
    diagramData.xMax = parseFloat(zoomMatch[2]);
    diagramData.yMin = parseFloat(zoomMatch[3]);
    diagramData.yMax = parseFloat(zoomMatch[4]);
  }
  
  // Look for function definitions
  const parts = command.split(';');
  const functions: Array<{equation: string; color: string}> = [];
  
  parts.forEach(part => {
    // Standard function: f(x)=...
    if (part.startsWith('f(x)=')) {
      functions.push({
        equation: part.substring(5),
        color: "blue"
      });
    }
    // Secondary function: g(x)=...
    else if (part.startsWith('g(x)=')) {
      functions.push({
        equation: part.substring(5),
        color: "red"
      });
    }
    // Tertiary function: h(x)=...
    else if (part.startsWith('h(x)=')) {
      functions.push({
        equation: part.substring(5),
        color: "green"
      });
    }
  });
  
  // Add functions to diagram data if any were found
  if (functions.length > 0) {
    diagramData.functions = functions;
    
    // Try to find special points (like roots)
    // This is more advanced and would need to calculate roots analytically
    // Simplified example for quadratic ax^2 + bx + c:
    functions.forEach(func => {
      const quadraticMatch = func.equation.match(/^([-+]?\d*\.?\d*)x\^2([-+]\d*\.?\d*)x([-+]\d*\.?\d*)$/);
      if (quadraticMatch) {
        const a = parseFloat(quadraticMatch[1] || "1");
        const b = parseFloat(quadraticMatch[2] || "0");
        const c = parseFloat(quadraticMatch[3] || "0");
        
        // Calculate discriminant
        const discriminant = b * b - 4 * a * c;
        
        // If real roots exist
        if (discriminant >= 0) {
          const specialPoints = diagramData.specialPoints || [];
          
          // First root
          const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          specialPoints.push({
            x: x1,
            y: 0,
            label: `(${x1.toFixed(1)}, 0)`,
            color: func.color
          });
          
          // Second root (if different from first)
          if (discriminant > 0) {
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            specialPoints.push({
              x: x2,
              y: 0,
              label: `(${x2.toFixed(1)}, 0)`,
              color: func.color
            });
          }
          
          diagramData.specialPoints = specialPoints;
        }
      }
    });
  }
  
  return diagramData;
}

export default DiagramRenderer;
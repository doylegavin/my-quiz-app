"use client";

import React, { useState } from 'react';
import UniversalDiagram from '@/components/UniversalDiagram'; // Adjust the import path as needed

const DiagramDemo = () => {
  // Example diagram data for a circle
  const [circleData] = useState({
    points: {
      "center": { id: "center", x: 4, y: -1, label: "O" },
    },
    elements: [
      {
        id: "circle1",
        type: "circle",
        centerPointId: "center",
        radius: 3,
        label: "Circle C",
      }
    ]
  });

  // Example data for a triangle with labeled angles
  const [triangleData] = useState({
    points: {
      "A": { id: "A", x: -5, y: -2, label: "A" },
      "B": { id: "B", x: 5, y: -2, label: "B" },
      "C": { id: "C", x: 0, y: 6, label: "C" },
    },
    elements: [
      {
        id: "AB",
        type: "line",
        point1Id: "A",
        point2Id: "B",
        measurement: "10 cm"
      },
      {
        id: "BC",
        type: "line",
        point1Id: "B",
        point2Id: "C",
        measurement: "8.6 cm"
      },
      {
        id: "CA",
        type: "line",
        point1Id: "C",
        point2Id: "A",
        measurement: "8.6 cm"
      },
      {
        id: "angleA",
        type: "angle",
        vertex: "A",
        point1: "C",
        point2: "B",
        measurement: "53°"
      },
      {
        id: "angleB",
        type: "angle",
        vertex: "B",
        point1: "A",
        point2: "C",
        measurement: "53°"
      },
      {
        id: "angleC",
        type: "angle",
        vertex: "C",
        point1: "A",
        point2: "B",
        measurement: "74°"
      }
    ]
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Math Diagram Demo</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Circle with Center (4, -1) and Radius 3</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-md">
            <h3 className="mb-2 font-medium">Student View</h3>
            <UniversalDiagram
              {...circleData}
              width={400}
              height={350}
              showSolution={false}
            />
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="mb-2 font-medium">Solution View</h3>
            <UniversalDiagram
              {...circleData}
              width={400}
              height={350}
              showSolution={true}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Triangle with Measurements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-md">
            <h3 className="mb-2 font-medium">Student View</h3>
            <UniversalDiagram
              {...triangleData}
              width={400}
              height={350}
              showGrid={false}
              showSolution={false}
            />
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="mb-2 font-medium">Solution View</h3>
            <UniversalDiagram
              {...triangleData}
              width={400}
              height={350}
              showGrid={false}
              showSolution={true}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-md mt-8">
        <h3 className="font-medium mb-2">Code Example:</h3>
        <pre className="text-sm bg-gray-800 text-white p-4 rounded overflow-auto">
{`// Circle Example
<UniversalDiagram
  points={{
    "center": { id: "center", x: 4, y: -1, label: "O" },
  }}
  elements={[
    {
      id: "circle1",
      type: "circle",
      centerPointId: "center",
      radius: 3,
      label: "Circle C",
    }
  ]}
  width={400}
  height={350}
  showSolution={true}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default DiagramDemo;
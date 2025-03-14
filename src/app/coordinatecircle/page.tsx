import React from 'react';
import CoordinateCircle from '@/components/CoordinateCircle';
import { NextPage } from 'next';

const MathDiagramPage: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mathematical Diagrams</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Circle with Center (4, -1) and Radius 3</h2>
        <CoordinateCircle 
          centerX={4} 
          centerY={-1} 
          radius={3} 
          width={600} 
          height={400} 
        />
      </div>
      
      {/* You could add more diagrams here */}
    </div>
  );
};

export default MathDiagramPage;
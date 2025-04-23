"use client";

import { useState, useEffect } from 'react';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

interface SlicingProps {
  yearList: number[];
  subject: string;
  types: {
    type: string;
    code: string;
    details: string;
  }[];
}

export default function Slicing({ yearList, subject, types }: SlicingProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Group types by category (e.g., "Paper 1", "Paper 2", etc.)
  const uniqueTypes = Array.from(new Set(types.map(t => {
    // Extract paper number or type (e.g., "Paper 1", "Marking Scheme")
    const match = t.type.match(/(Paper \d+|Marking Scheme.*)/i);
    return match ? match[0] : t.type;
  }))).sort();
  
  // Get years in descending order
  const sortedYears = [...yearList].sort((a, b) => b - a);
  
  return (
    <div className="w-full max-w-6xl">
      <h3 className="font-semibold text-xl mb-3">Papers Timeline</h3>
      
      <div className="overflow-x-auto pb-4">
        <div className="min-w-max">
          {/* Header row with years */}
          <div className="grid grid-flow-col auto-cols-fr gap-2 mb-2">
            <div className="font-medium p-2 text-left">Type</div>
            {sortedYears.map(year => (
              <div key={year} className="font-medium p-2 text-center">{year}</div>
            ))}
          </div>
          
          {/* Paper types rows */}
          {uniqueTypes.map(type => (
            <div 
              key={type} 
              className={`grid grid-flow-col auto-cols-fr gap-2 mb-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer ${
                selectedType === type ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
              onClick={() => setSelectedType(type === selectedType ? null : type)}
            >
              <div className="font-medium p-2 truncate">
                {type}
              </div>
              
              {sortedYears.map(year => {
                // Find matching papers for this type and year
                const matchingPapers = types.filter(t => {
                  const paperType = t.type.match(/(Paper \d+|Marking Scheme.*)/i);
                  return (paperType ? paperType[0] === type : t.type === type) && 
                         t.code.includes(year.toString());
                });
                
                return (
                  <div key={year} className="flex justify-center items-center p-2">
                    {matchingPapers.length > 0 ? (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{matchingPapers.length}</span>
                      </div>
                    ) : (
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Display selected papers */}
      {selectedType && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-3">{selectedType} Papers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedYears.map(year => {
              const matchingPapers = types.filter(t => {
                const paperType = t.type.match(/(Paper \d+|Marking Scheme.*)/i);
                return (paperType ? paperType[0] === selectedType : t.type === selectedType) && 
                       t.code.includes(year.toString());
              });
              
              return matchingPapers.map((paper, idx) => (
                <div 
                  key={`${year}-${idx}`}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-md shadow-sm"
                >
                  <div>
                    <div className="font-medium">{year} - {subject}</div>
                    <div className="text-sm text-gray-500">{paper.details}</div>
                  </div>
                  <a 
                    href={`/api/examinations/download?url=${encodeURIComponent(`https://www.examinations.ie/archive/exampapers/${year}/${paper.code}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-500 hover:text-blue-700"
                  >
                    <FiDownload size={20} />
                  </a>
                </div>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
} 
"use client";

import { useState } from 'react';

export default function FormulaBook() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 font-medium">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-full gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <span>Formula and Tables Book</span>
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Formula and Tables Book</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-center mb-4">
                <a 
                  href="https://www.examinations.ie/misc-doc/BI-EX-22184417.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Download Official Formula Book
                </a>
              </div>
              <p className="mb-4">
                The Mathematics Tables and Formulae booklet is provided by the State Examinations Commission 
                for use in the state examinations. It contains important formulas and tables for:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Algebra</li>
                <li>Trigonometry</li>
                <li>Geometry</li>
                <li>Calculus</li>
                <li>Statistics</li>
                <li>Applied Mathematics</li>
              </ul>
              <p>
                This booklet is provided to candidates during examinations, but it's advisable to become 
                familiar with its layout and contents during your study and preparation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
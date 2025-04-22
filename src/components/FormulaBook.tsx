"use client";

import Link from 'next/link';

export default function FormulaBook() {
  return (
    <Link 
      href="https://www.examinations.ie/misc-doc/BI-EX-22184417.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 font-medium"
    >
      <div className="flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <span>Formula and Tables Book</span>
      </div>
    </Link>
  );
} 
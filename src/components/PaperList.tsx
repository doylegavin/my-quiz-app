"use client";

import { ExamPaper } from "@/lib/utils/examinations";
import Link from "next/link";
import { FiDownload } from 'react-icons/fi';

// Helper function to determine the color based on paper type and level
function typeToColor(type: string, examType?: string, level?: string) {
  // Type-based colors
  if (type.includes('Marking') || type.includes('Scheme')) {
    return 'bg-red-500';
  }
  
  // Level-based colors for exam papers
  if (type.includes('Exam') || type.includes('Paper')) {
    if (examType && level) {
      if (examType.includes('Junior') || examType.includes('JC')) {
        if (level.includes('Higher')) return 'bg-purple-400'; // Purple for JC Higher
        if (level.includes('Ordinary')) return 'bg-yellow-300'; // Yellow for JC Ordinary
      } else if (examType.includes('Leaving') || examType.includes('LC')) {
        if (level.includes('Foundation')) return 'bg-orange-300'; // Orange for LC Foundation
        if (level.includes('Ordinary')) return 'bg-blue-300'; // Blue for LC Ordinary
        if (level.includes('Higher')) return 'bg-pink-300'; // Pink for LC Higher
      }
    }
    
    // Default color for exam papers if no specific match
    return 'bg-blue-500';
  }
  
  // Default fallback color for other types
  return 'bg-red-500';
}

// Sort papers by type and details
const sortPapers = (a: ExamPaper, b: ExamPaper) => {
  if (a.type.includes('Deferred') && !b.type.includes('Deferred')) return 1;
  if (!a.type.includes('Deferred') && b.type.includes('Deferred')) return -1;
  if (a.type.includes('Marking') && !b.type.includes('Marking')) return 1;
  if (!a.type.includes('Marking') && b.type.includes('Marking')) return -1;

  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

interface PaperListProps {
  papers: ExamPaper[];
}

export default function PaperList({ papers }: PaperListProps) {
  // Helper function to generate a proper filename
  const generateFilename = (paper: ExamPaper): string => {
    // Extract paper number from title/details if it exists
    let paperNumber = "";
    const paperMatch = paper.title?.match(/Paper\s*(\d+)|Paper\s*([IV]+)/i) || 
                     paper.details?.match(/Paper\s*(\d+)|Paper\s*([IV]+)/i);
    
    if (paperMatch) {
      const num = paperMatch[1] || paperMatch[2];
      paperNumber = `Paper${num}`;
    }
    
    // For marking schemes, add that to the filename
    if (paper.type.includes('Marking')) {
      paperNumber = paperNumber ? `${paperNumber}MarkingScheme` : 'MarkingScheme';
    }
    
    // Clean up the subject name and level for the filename
    const subjectFormatted = paper.subject.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
    const levelFormatted = paper.level.replace(/\s+Level/g, '').replace(/\s+/g, '');
    
    // Only add paperNumber if it exists (for subjects with multiple papers)
    const filename = `${paper.year}${subjectFormatted}${levelFormatted}${paperNumber}${paper.language}`;
    
    return `${filename}.pdf`;
  };
  
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {papers.sort(sortPapers).map((paper, i) => {
        const filename = generateFilename(paper);
        return (
          <div key={`${i}-${paper.id}`} className="relative">
            <a 
              href={paper.url}
              target="_blank"
              rel="noreferrer"
              className="no-underline"
            >
              <div className="w-72 overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg duration-300 hover:scale-105 hover:shadow-2xl">
                {/* TYPE */}
                <p className={`truncate px-4 py-2 text-xl font-semibold text-white ${typeToColor(paper.type, paper.examType, paper.level)}`}>
                  {paper.type}
                </p>
                <div className="space-y-1 px-4 pb-3 pt-2 text-black">
                  <p className="text-lg font-semibold">{paper.subject}</p>
                  <p className="truncate text-sm text-gray-600">{paper.title}</p>
                  <p className="font-mono text-gray-600">{paper.year}</p>
                  <div className="flex mt-2 space-x-2">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">{paper.level}</span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">{paper.language}</span>
                  </div>
                </div>
              </div>
            </a>
            <Link 
              href={`/api/examinations/download?url=${encodeURIComponent(paper.url)}&filename=${encodeURIComponent(filename)}`}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 hover:text-black transition-all hover:scale-105"
              title="Download PDF"
              onClick={(e) => e.stopPropagation()}
            >
              <FiDownload size={18} />
            </Link>
          </div>
        );
      })}
    </div>
  );
} 
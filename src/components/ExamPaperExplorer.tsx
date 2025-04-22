"use client";

import { useState, useEffect } from "react";
import { ExamPaper, getFavoriteSubjects, toggleFavoriteSubject } from "@/lib/utils/examinations";
import { getPapersFromStaticData, getSubjectsForExamType } from "@/lib/utils/examDataAccess";
import { cn } from "@/lib/utils";
import { FiFilter } from "react-icons/fi";
import { FiStar } from 'react-icons/fi';
import { FiStar as StarOutline } from 'react-icons/fi';
import Autocomplete from "./Autocomplete";
import Select from "./Select";
import PaperList from "./PaperList";
import data from '@/data/data.json';
import dynamic from 'next/dynamic';
import Link from "next/link";

// Available exam types
const examTypes = [
  { value: 'lc', label: 'Leaving Cert' },
  { value: 'jc', label: 'Junior Cert' },
  { value: 'lb', label: 'Leaving Cert Applied' },
];

// Available years
// Modified to be dynamic based on subject selection
const DEFAULT_YEARS = Array.from({ length: 24 }, (_, i) => (2023 - i).toString());

// Available levels
const levels = [
  { value: 'AL', label: 'Higher Level', disabled: false },
  { value: 'GL', label: 'Ordinary Level', disabled: false },
  { value: 'BL', label: 'Foundation Level', disabled: false },
  { value: 'CL', label: 'Common Level', disabled: false },
];

// Available languages
const languages = [
  { value: 'EV', label: 'English', disabled: false },
  { value: 'IV', label: 'Irish', disabled: false },
];

// Mapping between internal codes and UI labels
const examTypeMapping = {
  'lc': 'Leaving Cert',
  'jc': 'Junior Cert',
  'lb': 'Leaving Cert Applied'
};

// Dynamically import FormulaBook with a fallback
const FormulaBook = dynamic(
  () => import('./FormulaBook').catch(() => {
    // Return a simple component if FormulaBook fails to load
    return () => (
      <a 
        href="https://www.examinations.ie/misc-doc/BI-EX-7266997.pdf"
        target="_blank"
        rel="noreferrer"
        className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 font-medium"
      >
        <div className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <span>Formula and Tables Book</span>
        </div>
      </a>
    );
  }),
  { ssr: false, loading: () => <div className="h-14 bg-orange-500 rounded-lg animate-pulse"></div> }
);

// Add the SlicePapers dynamic import
const SlicePapers = dynamic(
  () => import('./SlicePapers').catch(() => {
    // Return a simple component if SlicePapers fails to load
    return () => (
      <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        <div className="w-full p-4 text-center text-white bg-gray-800 rounded-t-lg">
          Slice Papers
        </div>
        <div className="p-4">
          <p className="text-sm text-center text-gray-500 mb-4">
            Get a range of pages from a range of years
          </p>
          <div className="p-4 bg-gray-100 rounded text-center">
            Component loading failed. Please refresh the page.
          </div>
        </div>
      </div>
    );
  }),
  { ssr: false, loading: () => <div className="h-40 bg-gray-300 rounded-lg animate-pulse"></div> }
);

export default function ExamPaperExplorer() {
  // State for search parameters
  const [examType, setExamType] = useState<string>("lc");
  const [subject, setSubject] = useState<string>("Mathematics");
  const [subjectList, setSubjectList] = useState<string[]>([]);
  const [year, setYear] = useState<string>("2024");
  const [availableYears, setAvailableYears] = useState<string[]>(DEFAULT_YEARS);
  const [level, setLevel] = useState<string>("AL");
  const [language, setLanguage] = useState<string>("EV");
  
  // State for exam papers
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for favorites
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>([]);
  
  // State for showing filters
  const [showFilters, setShowFilters] = useState<boolean>(true);
  
  // Load favorites and papers on initial render
  useEffect(() => {
    const favs = getFavoriteSubjects();
    setFavoriteSubjects(favs);
    
    // Load initial papers with default values
    loadPapers(examType, subject, year, level, language);
    
    // Get initial subject list for the default exam type (lc)
    loadSubjectsForExamType(examType);
  }, []);
  
  // Function to fetch available subjects for exam type from static data
  const loadSubjectsForExamType = (examTypeVal: string) => {
    try {
      setLoading(true);
      
      // Get subjects for this exam type
      const subjects = getSubjectsForExamType(examTypeVal);
      setSubjectList(subjects);
      
      // Set initial subject (prefer the default Mathematics if available, then a favorite, then first in list)
      if (subjects.length > 0) {
        // If we already have a subject selected and it's in the list, keep it
        if (subject && subjects.includes(subject)) {
          // Keep current subject
        } 
        // Otherwise, try to set Mathematics as default if available
        else if (subjects.includes("Mathematics")) {
          setSubject("Mathematics");
        } 
        // Or use a favorite subject if available
        else {
          const favSubjects = getFavoriteSubjects();
          const initialSubject = favSubjects.find(fav => subjects.includes(fav)) || subjects[0];
          setSubject(initialSubject);
        }
        
        // Get available years for this subject (use current subject or the one we just set)
        const currentSubject = subject && subjects.includes(subject) ? subject : 
                              subjects.includes("Mathematics") ? "Mathematics" : 
                              (getFavoriteSubjects().find(fav => subjects.includes(fav)) || subjects[0]);
                              
        const yearsForSubject = getAvailableYearsForSubject(examTypeVal, currentSubject);
        setAvailableYears(yearsForSubject);
        
        // Try to keep the year 2024 if it's available, otherwise use the most recent
        if (yearsForSubject.includes("2024")) {
          setYear("2024");
        } else if (yearsForSubject.length > 0 && year !== yearsForSubject[0]) {
          setYear(yearsForSubject[0]);
        }
        
        // Only load papers here if we didn't already do it in the initial useEffect
        if (papers.length === 0) {
          loadPapers(examTypeVal, currentSubject, 
            yearsForSubject.includes("2024") ? "2024" : (yearsForSubject[0] || ""), 
            level, language);
        }
      } else {
        // No subjects available for this exam type
        if (!subject) {
          setSubject("");
        }
        setAvailableYears(DEFAULT_YEARS);
        if (!year) {
          setYear(DEFAULT_YEARS[0]);
        }
        setPapers([]);
      }
    } catch (error) {
      console.error("Error loading subjects:", error);
      setError("Failed to load subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to get available years for a subject
  const getAvailableYearsForSubject = (examType: string, subject: string): string[] => {
    try {
      // First, find the subject ID
      const subNumsToNames = (data as any).subNumsToNames || {};
      let subjectId = "";
      
      for (const [id, name] of Object.entries(subNumsToNames)) {
        if (name === subject) {
          subjectId = id;
          break;
        }
      }
      
      if (!subjectId) return DEFAULT_YEARS;
      
      // Get the exam data
      const examData = (data as any)[examType] || {};
      if (!examData || !(subjectId in examData)) return DEFAULT_YEARS;
      
      // Get available years for this subject and sort in descending order
      const years = Object.keys(examData[subjectId]).sort((a, b) => parseInt(b) - parseInt(a));
      
      return years.length > 0 ? years : DEFAULT_YEARS;
    } catch (error) {
      console.error("Error getting available years:", error);
      return DEFAULT_YEARS;
    }
  };
  
  // Function to toggle favorite status for a subject
  const handleToggleFavorite = (subj: string) => {
    const updatedFavorites = toggleFavoriteSubject(subj);
    setFavoriteSubjects(updatedFavorites);
  };
  
  // Function to fetch papers from static data
  const loadPapers = (
    examType: string, 
    subject: string, 
    year: string, 
    level: string, 
    language: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Loading papers: ${examType}, ${subject}, ${year}, ${level}, ${language}`);
      
      // Store current subject in localStorage for other components to use
      if (typeof window !== 'undefined' && subject) {
        localStorage.setItem('currentSubject', subject);
        // Dispatch storage event for other components to pick up the change
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'currentSubject',
          newValue: subject
        }));
      }
      
      // If any required parameters are missing, bail out
      if (!examType || !subject || !year) {
        console.log("Missing required parameters, cannot load papers");
        setPapers([]);
        return;
      }
      
      // Find subject ID from name
      const subNumsToNames = (data as any).subNumsToNames || {};
      let subjectId = "";
      
      for (const [id, name] of Object.entries(subNumsToNames)) {
        if (name === subject) {
          subjectId = id;
          break;
        }
      }
      
      if (!subjectId) {
        console.log(`Could not find subject ID for ${subject}`);
        setPapers([]);
        return;
      }
      
      // Get the exam data
      const examData = (data as any)[examType] || {};
      if (!examData) {
        console.log(`No data found for exam type ${examType}`);
        setPapers([]);
        return;
      }
      
      if (!examData[subjectId]) {
        console.log(`No data found for subject ${subject} (ID: ${subjectId}) in ${examType}`);
        setPapers([]);
        return;
      }
      
      if (!examData[subjectId][year]) {
        console.log(`No data found for year ${year} in subject ${subject} (ID: ${subjectId}) in ${examType}`);
        setPapers([]);
        return;
      }
      
      // Get all papers for this subject/year
      const allPapers = examData[subjectId][year];
      
      // Filter papers by level and language
      const filteredPapers = Object.entries(allPapers)
        .flatMap(([type, papers]) => {
          // Ensure papers is an array
          const paperArray = Array.isArray(papers) ? papers : [];
          
          return paperArray.map(paper => ({
            ...paper,
            year,
            subject: subject,
            level: level,
            language: language,
            type: type.includes('marking') ? 'Marking Scheme' : 'Exam Paper',
            examType: examTypeMapping[examType as keyof typeof examTypeMapping] || 'Other',
            id: `${year}-${subject}-${level}-${language}-${type}`,
            url: `https://www.examinations.ie/archive/${type.includes('marking') ? 'markingschemes' : 'exampapers'}/${year}/${paper.url}`
          }));
        })
        .filter(paper => 
          // Filter by language and level from URL
          (paper.url.toLowerCase().includes(language.toLowerCase()) || paper.url.includes('BV')) &&
          (paper.url.toUpperCase().includes(level.toUpperCase()) || 
           paper.url.includes('ZL') || 
           (paper.url.includes('CL') && (level === 'AL' || level === 'GL')))
        )
        // Sort exam papers before marking schemes
        .sort((a, b) => {
          if (a.type === 'Exam Paper' && b.type === 'Marking Scheme') return -1;
          if (a.type === 'Marking Scheme' && b.type === 'Exam Paper') return 1;
          return 0;
        });
      
      console.log(`Found ${filteredPapers.length} papers`);
      setPapers(filteredPapers);
    } catch (error) {
      console.error("Error loading papers:", error);
      setError("Failed to load exam papers. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Update when filter parameters change
  useEffect(() => {
    if (subject && year) {
      loadPapers(examType, subject, year, level, language);
    }
  }, [examType, subject, year, level, language]);
  
  // Function to toggle showing filters
  const toggleShowFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <button
          onClick={toggleShowFilters}
          className="w-full flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md"
        >
          <span className="font-medium">
            {showFilters ? "Hide Filters" : "Show Filters"}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
      
      {/* Filters Section */}
      <div className="w-full space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={toggleShowFilters}
            className="flex items-center gap-2 rounded-lg bg-pink-50 px-4 py-2 text-pink-600 hover:bg-pink-100"
          >
            <FiFilter className="h-5 w-5" />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="flex flex-row flex-wrap items-center justify-center gap-8">
            {/* EXAM TYPE */}
            <div className="w-52">
              <Select
                value={examType}
                onChange={(value) => {
                  setExamType(value);
                  // Load subjects for the selected exam type
                  loadSubjectsForExamType(value);
                }}
                options={examTypes}
                title={examTypes.find(e => e.value === examType)?.label}
              />
            </div>
            
            {/* SUBJECT */}
            <div className="w-64">
              <Autocomplete
                value={subject}
                onChange={(value) => {
                  if (!value) return;
                  setSubject(value);
                  
                  // Get available years for this subject
                  const yearsForSubject = getAvailableYearsForSubject(examType, value);
                  setAvailableYears(yearsForSubject);
                  
                  // Set default year to most recent available
                  if (yearsForSubject.length > 0) {
                    setYear(yearsForSubject[0]);
                  } else {
                    setYear("");
                  }
                }}
                options={subjectList.sort((a, b) => {
                  if (favoriteSubjects.includes(a) && !favoriteSubjects.includes(b)) return -1;
                  if (!favoriteSubjects.includes(a) && favoriteSubjects.includes(b)) return 1;
                  return a.localeCompare(b);
                })}
                placeholder="Search subjects..."
                renderOption={(option) => (
                  <div className="flex flex-row items-center gap-2">
                    <div className="h-4 w-4">
                      <button
                        className="z-10 text-lg duration-300 hover:scale-110"
                        onClick={(e) => {
                          handleToggleFavorite(option);
                          e.stopPropagation();
                        }}
                      >
                        {favoriteSubjects.includes(option) ? (
                          <FiStar className="h-full w-full text-yellow-400 fill-current" />
                        ) : (
                          <StarOutline className="h-full w-full text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div>{option}</div>
                  </div>
                )}
              />
            </div>
            
            {/* YEAR */}
            <div className="w-32">
              <Autocomplete
                value={year}
                onChange={(value) => {
                  if (!value) return;
                  setYear(value);
                }}
                options={availableYears}
                placeholder="Year..."
              />
            </div>
            
            {/* LEVEL */}
            <div className="w-44">
              <Select
                value={level}
                onChange={(value) => {
                  setLevel(value);
                }}
                options={levels}
                title={levels.find(e => e.value === level)?.label}
              />
            </div>
            
            {/* LANGUAGE */}
            <div className="flex h-12 flex-row items-stretch divide-x divide-gray-300 overflow-hidden rounded-md border border-gray-300">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  className={`px-4 py-3 text-center font-bold duration-300 text-black disabled:bg-gray-100 disabled:opacity-50 ${
                    language === lang.value ? 'bg-gray-100' : 'bg-white'
                  }`}
                  onClick={() => {
                    setLanguage(lang.value);
                  }}
                  disabled={lang.disabled}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Additional Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <FormulaBook />
        <Link 
          href="/points" 
          className="block w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 font-medium"
          onClick={() => {
            // Track analytics if available
            if (typeof window !== 'undefined' && window.splitbee) {
              window.splitbee.track('Points Calculator Visit');
            }
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>
            <span>Points Calculator</span>
          </div>
        </Link>
      </div>
      
      {/* Slice Papers Section */}
     {/*  <div className="my-6">
        <SlicePapers />
      </div> */}
      
      {/* Papers Results Section */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2">Loading exam papers...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            <p>{error}</p>
            <button
              onClick={() => loadPapers(examType, subject, year, level, language)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : papers.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">No papers found for the selected criteria.</p>
            <p className="mt-2 text-sm text-gray-400">Try different search parameters.</p>
          </div>
        ) : (
          <PaperList papers={papers} />
        )}
      </div>
    </div>
  );
} 
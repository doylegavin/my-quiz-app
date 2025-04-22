"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Define paper types to match examfinder's approach
const paperOptions = [
  { value: "higher-ev", label: "Higher Level", code: "ALP1", type: "Exam Paper" },
  { value: "ordinary-ev", label: "Ordinary Level", code: "GLP1", type: "Exam Paper" },
  { value: "foundation-ev", label: "Foundation Level", code: "BLP1", type: "Exam Paper" },
  { value: "higher-p2-ev", label: "Higher Level Paper 2", code: "ALP2", type: "Exam Paper" },
  { value: "ordinary-p2-ev", label: "Ordinary Level Paper 2", code: "GLP2", type: "Exam Paper" },
  { value: "higher-iv", label: "Higher Level (Irish)", code: "ALPI", type: "Exam Paper" },
  { value: "ordinary-iv", label: "Ordinary Level (Irish)", code: "GLPI", type: "Exam Paper" },
  { value: "marking-scheme", label: "Marking Scheme", code: "EXMS", type: "Marking Scheme" }
];

// URL paper type mapping
const urlPaperType: Record<string, string> = {
  "Exam Paper": "exampapers",
  "Marking Scheme": "markingschemes"
};

export default function SlicePapers() {
  const [paperType, setPaperType] = useState<string>("higher-ev");
  const [startYear, setStartYear] = useState<string>("2022");
  const [endYear, setEndYear] = useState<string>("2022");
  const [startPage, setStartPage] = useState<string>("1");
  const [endPage, setEndPage] = useState<string>("7");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<any>(null);
  
  // Get the current subject from localStorage
  const [subject, setSubject] = useState<string>("Mathematics");
  
  useEffect(() => {
    // Load subject from localStorage on client side
    if (typeof window !== 'undefined') {
      const savedSubject = localStorage.getItem('currentSubject');
      if (savedSubject) setSubject(savedSubject);
    }
    
    // Listen for storage events
    const handleSubjectChange = (event: StorageEvent) => {
      if (event.key === 'currentSubject' && event.newValue) {
        setSubject(event.newValue);
      }
    };
    
    window.addEventListener('storage', handleSubjectChange);
    return () => {
      window.removeEventListener('storage', handleSubjectChange);
    };
  }, []);

  // Find selected paper option
  const selectedPaper = paperOptions.find(option => option.value === paperType);

  const handleSubmit = async () => {
    setDownloadState("loading");
    setErrorMessage("");
    setApiResponse(null);
    
    try {
      // Generate arrays of years and pages
      const years = Array.from(
        { length: Math.abs(parseInt(endYear) - parseInt(startYear)) + 1 },
        (_, i) => parseInt(startYear) < parseInt(endYear) 
          ? parseInt(startYear) + i 
          : parseInt(endYear) + i
      );
      
      const pages = Array.from(
        { length: parseInt(endPage) - parseInt(startPage) + 1 },
        (_, i) => parseInt(startPage) - 1 + i
      );
      
      console.log("Calculated years:", years);
      console.log("Calculated pages:", pages);
      
      const requestPayload = {
        years,
        pages,
        type: urlPaperType[selectedPaper?.type || "Exam Paper"],
        code: selectedPaper?.code,
        subject
      };
      
      console.log("Sending request to /api/pdf with:", requestPayload);
      
      // Make API request
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });
      
      const responseData = await res.json();
      setApiResponse(responseData);
      
      if (!res.ok) {
        setErrorMessage(responseData.error || `Server error: ${res.status}`);
        setDownloadState("error");
      } else {
        setDownloadState("idle");
      }
    } catch (error) {
      console.error("API error:", error);
      setDownloadState("error");
      setErrorMessage("Failed to connect to API");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 p-4 text-white bg-gray-800 hover:bg-gray-700 transition-colors rounded-t-lg"
      >
        {isExpanded ? "▼" : "▲"} Slice Papers
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <p className="text-sm text-center text-gray-500">
            Get a range of pages from a range of years
          </p>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Paper</label>
              <Select value={paperType} onValueChange={(value) => setPaperType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select paper type" />
                </SelectTrigger>
                <SelectContent>
                  {paperOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Start Year</label>
                <Input
                  type="number"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  min="1990"
                  max="2024"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">End Year</label>
                <Input
                  type="number"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  min="1990"
                  max="2024"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Start Page</label>
                <Input
                  type="number"
                  value={startPage}
                  onChange={(e) => {
                    setStartPage(e.target.value);
                    if (parseInt(e.target.value) > parseInt(endPage)) {
                      setEndPage(e.target.value);
                    }
                  }}
                  min="1"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">End Page</label>
                <Input
                  type="number"
                  value={endPage}
                  onChange={(e) => {
                    setEndPage(e.target.value);
                    if (parseInt(e.target.value) < parseInt(startPage)) {
                      setStartPage(e.target.value);
                    }
                  }}
                  min="1"
                />
              </div>
            </div>
            
            <Button
              variant="default"
              className="w-full"
              onClick={handleSubmit}
              disabled={downloadState === "loading"}
            >
              {downloadState === "idle" ? (
                "Test API"
              ) : downloadState === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Error, try again"
              )}
            </Button>
            
            {errorMessage && (
              <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
            )}
            
            {apiResponse && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm overflow-auto max-h-40">
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
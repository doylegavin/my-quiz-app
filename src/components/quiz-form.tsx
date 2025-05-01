//src/components//quiz-form.tsx

"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import subjectData from "@/data/subjects";
// Import all functions from the compatibility layer
import * as subjectUtils from '@/lib/utils/subjectCompatibility';
// Import for UUID generation
import { v4 as uuidv4 } from "uuid";
// Import Zustand store
import { useFormattedQuizStore } from "@/stores/useFormattedQuizStore";
// Add direct imports for mathematics data
import mathsHigherLevel from '@/data/subjects/mathematics/higher-level';
import mathsOrdinaryLevel from '@/data/subjects/mathematics/ordinary-level';

// Direct imports for English data
import englishHigherLevel from '@/data/subjects/english/higher-level';
import englishOrdinaryLevel from '@/data/subjects/english/ordinary-level';

// Direct imports for Irish data
import irishHigherLevel from '@/data/subjects/irish/higher-level';
import irishOrdinaryLevel from '@/data/subjects/irish/ordinary-level';

// Define core subjects that need special handling
const CORE_SUBJECTS = ['mathematics', 'english', 'irish'];

export function QuizForm() {
  // Add reference to Zustand store
  const { setFormattedQuiz, saveQuizToDatabase } = useFormattedQuizStore();
  
  const [selectedSubject, setSelectedSubject] = useState<string>("mathematics");
  const [selectedPaper, setSelectedPaper] = useState<string>("Both");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Random");
  const [selectedLevel, setSelectedLevel] = useState<string>("Higher Level");
  const [selectedSection, setSelectedSection] = useState<string>("Short Questions");
  const [selectedTopic, setSelectedTopic] = useState<string>("Random");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [availableSubtopics, setAvailableSubtopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [quizDescription, setQuizDescription] = useState<string>("");
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  // Initialize available subjects
  useEffect(() => {
    // Get all subjects dynamically from the data files
    const subjects = Object.keys(subjectData);
    setAvailableSubjects(subjects);
    
    // Simple logging without hardcoded values
    console.log("Available subjects:", subjects);
  }, []);

  // Helper function to check if a subject is a core subject
  const isCoreSubject = (subject: string): boolean => {
    return CORE_SUBJECTS.includes(subject);
  };

  // Add a function to directly get level data
  const getDirectLevelData = (subject: string, level: string) => {
    console.log(`Getting direct level data for ${subject}/${level}`);
    
    // Direct mapping for mathematics files
    if (subject === 'mathematics') {
      if (level === 'Higher Level') return mathsHigherLevel.mathematics;
      if (level === 'Ordinary Level') return mathsOrdinaryLevel.mathematics;
    }
    
    // Direct mapping for english files
    if (subject === 'english') {
      if (level === 'Higher Level') return englishHigherLevel.english;
      if (level === 'Ordinary Level') return englishOrdinaryLevel.english;
    }
    
    // Direct mapping for irish files
    if (subject === 'irish') {
      if (level === 'Higher Level') return irishHigherLevel.irish;
      if (level === 'Ordinary Level') return irishOrdinaryLevel.irish;
    }
    
    // Direct mapping for physical education files
    if (subject === 'physicalEducation') {
      // Import dynamically based on level
      try {
        // Physical Education currently only has Higher Level
        const physEdHigherLevel = require('@/data/subjects/physical-education/higher-level').default;
        if (level === 'Higher Level') return physEdHigherLevel.physicalEducation;
      } catch (error) {
        console.error("Error loading physical education data:", error);
      }
    }
    
    // For other subjects, try to dynamically import the level data
    try {
      const levelFile = require(`@/data/subjects/${subject}/${level.toLowerCase().replace(" ", "-")}`).default;
      if (levelFile && levelFile[subject]) {
        return levelFile[subject];
      }
    } catch (error) {
      console.log(`No direct level file found for ${subject}/${level}, falling back to compatibility layer`);
    }
    
    // For other subjects, use the compatibility layer
    return subjectUtils.getSubjectData(subject);
  };

  // Get available levels for any subject - SIMPLIFIED
  const getAvailableLevels = (subject: string): string[] => {
    // Check for subjects with foundation level
    if (['mathematics', 'irish', 'english'].includes(subject)) {
      return ['Higher Level', 'Ordinary Level', 'Foundation Level'];
    }
    
    // For other subjects, check if they have higher/ordinary level files
    const levels = [];
    try {
      if (require(`@/data/subjects/${subject}/higher-level`)) {
        levels.push('Higher Level');
      }
    } catch {}
    
    try {
      if (require(`@/data/subjects/${subject}/ordinary-level`)) {
        levels.push('Ordinary Level'); 
      }
    } catch {}
    
    return levels.length ? levels : ['Higher Level']; // Default to Higher Level if none found
  };

  // Get available papers for the selected subject and level - SIMPLIFIED
  const getAvailablePapers = (subject: string, level: string): string[] => {
    // Check if we have direct access for this subject
    let papers = [];
    
    // Log direct level data retrieval
    console.log(`Getting papers for ${subject}/${level}`);
    
    // Get papers from the level data (more reliable than index.ts)
    const levelData = getDirectLevelData(subject, level);
    if (levelData && levelData.papers) {
      papers = Object.keys(levelData.papers);
      console.log(`Direct papers from level data:`, papers);
      if (papers.length > 0) {
        return papers;
      }
    }
    
    // Fallback to the index.ts data via subjectData
    const subjectDataFromIndex = subjectData[subject];
    if (subjectDataFromIndex && subjectDataFromIndex.papers) {
      papers = Object.keys(subjectDataFromIndex.papers);
      console.log(`Papers from index.ts:`, papers);
      if (papers.length > 0) {
        return papers;
      }
    }
    
    // If all else fails, try compatibility layer
    const compatData = subjectUtils.getSubjectData(subject);
    if (compatData && compatData.papers) {
      papers = Object.keys(compatData.papers);
      console.log(`Papers from compatibility layer:`, papers);
      return papers;
    }
    
    return [];
  };

  // Function to get topics for a subject/paper - SIMPLIFIED
  const getAvailableTopics = (subject: string, paper: string): string[] => {
    // Try to get topics directly from the level data first
    const levelData = getDirectLevelData(subject, selectedLevel);
    console.log(`Getting topics for ${subject}, level data:`, levelData);
    
    // For core subjects, use the selected paper directly
    if (isCoreSubject(subject)) {
      console.log(`${subject} Level Data for topics:`, levelData);
      if (levelData?.papers?.[paper]?.topics) {
        const topics = Object.keys(levelData.papers[paper].topics);
        console.log(`Direct topics for ${subject}/${selectedLevel}/${paper}:`, topics);
        return topics;
      }
    } 
    // For non-core subjects, handle paper selection differently
    else {
      console.log(`Non-core subject ${subject} Level Data:`, levelData);
      
      // Check if subject uses "papers" structure (like physicalEducation)
      if (levelData && levelData.papers) {
        // Find the appropriate paper to use
        const availablePapers = Object.keys(levelData.papers);
        let paperToUse = "";
        
        if (availablePapers.includes("Both")) {
          paperToUse = "Both";
        } else if (availablePapers.length > 0) {
          paperToUse = availablePapers[0];
        }
        
        console.log(`Using paper ${paperToUse} for topics in ${subject}`);
        
        if (paperToUse && levelData.papers[paperToUse] && levelData.papers[paperToUse].topics) {
          const topics = Object.keys(levelData.papers[paperToUse].topics);
          console.log(`${subject} topics from papers structure:`, topics);
          return topics;
        }
      }
      // Check if subject uses "sections" structure (like biology)
      else if (levelData && levelData.sections) {
        // Find the appropriate section to use
        const availableSections = Object.keys(levelData.sections);
        let sectionToUse = "";
        
        if (availableSections.length > 0) {
          sectionToUse = availableSections[0]; // Use first section by default (e.g., "sectionA")
        }
        
        console.log(`Using section ${sectionToUse} for topics in ${subject}`);
        
        if (sectionToUse && levelData.sections[sectionToUse] && levelData.sections[sectionToUse].topics) {
          const topics = Object.keys(levelData.sections[sectionToUse].topics);
          console.log(`${subject} topics from sections structure:`, topics);
          return topics;
        }
      }
    }
    
    // Fallback to compatibility layer for other subjects
    const topics = subjectUtils.getTopics(subject, selectedLevel, paper);
    console.log(`Compatibility layer topics for ${subject}/${selectedLevel}/${paper}:`, topics);
    return topics;
  };

  // Function to get subtopics for a topic
  const getSubtopicsForTopic = (subject: string, paper: string, topic: string): string[] => {
    // Try to get subtopics directly from the level data first
    const levelData = getDirectLevelData(subject, selectedLevel);
    
    // For core subjects, use the selected paper directly
    if (isCoreSubject(subject)) {
      console.log(`${subject} Level Data for subtopics:`, levelData?.papers?.[paper]?.topics);
      console.log("Looking for topic:", topic);
      
      if (levelData?.papers?.[paper]?.topics?.[topic]) {
        const subtopics = levelData.papers[paper].topics[topic];
        console.log(`Direct subtopics for ${subject}/${selectedLevel}/${paper}/${topic}:`, subtopics);
        return subtopics;
      }
    }
    // For non-core subjects
    else {
      console.log(`Non-core subject ${subject} Level Data for subtopics:`, levelData);
      console.log("Looking for topic:", topic);
      
      // Check if subject uses "papers" structure (like physicalEducation)
      if (levelData && levelData.papers) {
        // Find the appropriate paper to use
        const availablePapers = Object.keys(levelData.papers);
        let paperToUse = "";
        
        if (availablePapers.includes("Both")) {
          paperToUse = "Both";
        } else if (availablePapers.length > 0) {
          paperToUse = availablePapers[0];
        }
        
        console.log(`Using paper ${paperToUse} for subtopics in ${subject}`);
        
        if (paperToUse && 
            levelData.papers[paperToUse] && 
            levelData.papers[paperToUse].topics && 
            levelData.papers[paperToUse].topics[topic]) {
          const subtopics = levelData.papers[paperToUse].topics[topic];
          console.log(`${subject} subtopics from papers structure:`, subtopics);
          return subtopics;
        }
      }
      // Check if subject uses "sections" structure (like biology)
      else if (levelData && levelData.sections) {
        // For subjects with sections, we need to find which section contains the topic
        const availableSections = Object.keys(levelData.sections);
        
        // Search in all sections for the topic
        for (const section of availableSections) {
          if (levelData.sections[section] && 
              levelData.sections[section].topics && 
              levelData.sections[section].topics[topic]) {
                
            const subtopics = levelData.sections[section].topics[topic];
            console.log(`${subject} subtopics found in section ${section}:`, subtopics);
            return subtopics;
          }
        }
        
        console.log(`Topic ${topic} not found in any section for ${subject}`);
      }
    }
    
    // Fallback to compatibility layer
    const subtopics = subjectUtils.getSubtopics(subject, selectedLevel, paper, topic);
    console.log(`Compatibility layer subtopics for ${subject}/${selectedLevel}/${paper}/${topic}:`, subtopics);
    return subtopics;
  };

  // Update the useEffect that reacts to paper change to directly access topics
  useEffect(() => {
    // Only core subjects use the paper selection
    if (isCoreSubject(selectedSubject) && selectedPaper !== "Random" && selectedPaper !== "") {
      // Get topics for the selected paper
      const topics = getAvailableTopics(selectedSubject, selectedPaper);
      console.log("Available topics for", selectedSubject, selectedPaper, ":", topics);
      
      // Check if there are any topics available
      if (topics.length > 0) {
        // Set the first topic as default if current selection is not valid
        if (!topics.includes(selectedTopic)) {
          setSelectedTopic(topics[0]);
        }
      } else {
        setSelectedTopic("Random");
      }
    } else if (!isCoreSubject(selectedSubject)) {
      // For non-core subjects
      console.log("Handling non-core subject topic selection:", selectedSubject);
      
      // Get topics regardless of paper
      const topics = getAvailableTopics(selectedSubject, "");
      console.log("Available topics for non-core subject:", topics);
      
      if (topics.length > 0) {
        // Set the first topic as default if current selection is not valid
        if (!topics.includes(selectedTopic)) {
          setSelectedTopic(topics[0]);
        }
      } else {
        setSelectedTopic("Random");
      }
    } else {
      setSelectedTopic("Random");
    }
  }, [selectedPaper, selectedSubject, selectedLevel]);

  // Update useEffect for topic change to use direct subtopic access
  useEffect(() => {
    if (selectedTopic !== "Random") {
      try {
        // Get subtopics using the direct access function
        const subtopics = getSubtopicsForTopic(selectedSubject, selectedPaper, selectedTopic);
        console.log("Available subtopics for", selectedSubject, selectedPaper, selectedTopic, ":", subtopics);
        setAvailableSubtopics(subtopics);
        
        // Reset subtopic if it's not valid
        if (subtopics.length > 0 && !subtopics.includes(selectedSubtopic)) {
          setSelectedSubtopic(subtopics[0]);
        }
      } catch (error) {
        console.error("Error updating subtopics:", error);
        setAvailableSubtopics([]);
        setSelectedSubtopic("");
      }
    } else {
      setAvailableSubtopics([]);
      setSelectedSubtopic("");
    }
  }, [selectedTopic, selectedPaper, selectedLevel, selectedSubject]);

  // Get paper label based on subject data
  const getPaperLabel = (subject: string): string => {
    // Get metadata directly from subject data
    const metadata = subjectUtils.getSubjectMetadata(subject);
    return metadata.paperLabel || subjectUtils.getPaperLabel(subject);
  };

  // Get section label based on subject data
  const getSectionLabel = (subject: string): string => {
    // Get metadata directly from subject data
    const metadata = subjectUtils.getSubjectMetadata(subject);
    return metadata.sectionLabel || "Section";
  };

  // Get topic label based on subject data
  const getTopicLabel = (subject: string): string => {
    // Get metadata directly from subject data
    const metadata = subjectUtils.getSubjectMetadata(subject);
    return metadata.topicLabel || "Topic";
  };

  // Get subtopic label based on subject data
  const getSubtopicLabel = (subject: string): string => {
    // Get metadata directly from subject data
    const metadata = subjectUtils.getSubjectMetadata(subject);
    return metadata.subtopicLabel || "Subtopic";
  };

  // Get available levels based on current subject
  const allLevels = getAvailableLevels(selectedSubject);

  // Reset default selections when subject changes
  useEffect(() => {
    console.log("Subject changed to:", selectedSubject);
    
    // Get levels directly from the selected subject data file
    const levels = getAvailableLevels(selectedSubject);
    console.log("Available levels:", levels);
    
    // Set a valid level
    if (!levels.includes(selectedLevel)) {
      setSelectedLevel(levels[0]);
    }
    
    // Different handling for core vs non-core subjects
    if (isCoreSubject(selectedSubject)) {
      // Core subjects have papers
      const availablePapers = getAvailablePapers(selectedSubject, selectedLevel);
      console.log("Available papers for core subject:", availablePapers);
      
      if (availablePapers.length > 0 && !availablePapers.includes(selectedPaper)) {
        setSelectedPaper(availablePapers[0]);
      } else if (availablePapers.length === 0) {
        // Set a default if no papers found
        setSelectedPaper("Both");
      }
      
      // Set difficulty
      const currentSubject = subjectData[selectedSubject];
      if (currentSubject && currentSubject.difficulty) {
        const availableDifficulties = currentSubject.difficulty;
        if (availableDifficulties.length > 0 && !availableDifficulties.includes(selectedDifficulty)) {
          setSelectedDifficulty(availableDifficulties[0]);
        } else if (availableDifficulties.length === 0) {
          setSelectedDifficulty("Random");
        }
      }
    } else {
      // Non-core subjects don't have paper selection
      // Get sections directly from the level data
      const levelData = getDirectLevelData(selectedSubject, selectedLevel || levels[0]);
      
      if (levelData && levelData.papers) {
        const papers = Object.keys(levelData.papers);
        if (papers.length > 0) {
          const firstPaper = papers[0];
          
          // Set sections if available
          if (levelData.papers[firstPaper] && levelData.papers[firstPaper].sections) {
            const sections = levelData.papers[firstPaper].sections;
            if (sections.length > 0 && !sections.includes(selectedSection)) {
              setSelectedSection(sections[0]);
            }
          }
          
          // Set topics if available
          if (levelData.papers[firstPaper] && levelData.papers[firstPaper].topics) {
            const topics = Object.keys(levelData.papers[firstPaper].topics);
            if (topics.length > 0 && !topics.includes(selectedTopic)) {
              setSelectedTopic(topics[0]);
            } else if (topics.length === 0) {
              setSelectedTopic("Random");
            }
          }
        }
      }
      
      // Set difficulty
      const currentSubject = subjectData[selectedSubject];
      if (currentSubject && currentSubject.difficulty) {
        const availableDifficulties = currentSubject.difficulty;
        if (availableDifficulties.length > 0 && !availableDifficulties.includes(selectedDifficulty)) {
          setSelectedDifficulty(availableDifficulties[0]);
        } else if (availableDifficulties.length === 0) {
          setSelectedDifficulty("Random");
        }
      }
    }
  }, [selectedSubject]);

  const errorMessages = [
    "Oops! Question was too hard! Try again",
    "Oops! Question was too easy! Try again",
    "The AI just woke up! Try again",
    "404 Brain Not Found! Try again",
    "Oops! The AI blinked! Try again",
    "Even AI needs a break... Try again",
    "Our AI is currently daydreaming. Try again!",
    "The question vanished into the void! Try again",
  ];
  
  const simulateProgress = () => {
    let value = 0;
    const interval = setInterval(() => {
      value += 3;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0); // Reset progress when starting
    
    if (!selectedLevel) {
      alert("Please select a level.");
      setLoading(false);
      return;
    }
    
    // Check for placeholder values
    if (
      (selectedSection === "no-sections-available") || 
      (selectedTopic === "no-topics-available")
    ) {
      alert("Please select valid options for all fields.");
      setLoading(false);
      return;
    }
    
    simulateProgress();
    
    console.log("Submitting quiz with data:", {
      subject: selectedSubject,
      level: selectedLevel,
      paper: selectedPaper,
      topic: selectedTopic,
      subtopic: selectedSubtopic,
      difficulty: selectedDifficulty
    });
    
    // Prepare the data to send to the API
    const requestData = {
      subject: selectedSubject,
      difficulty: selectedDifficulty,
      level: selectedLevel,
      paper: selectedPaper,
      paperType: getPaperLabel(selectedSubject).toLowerCase(),
      sections: selectedSection !== "no-sections-available" ? selectedSection : undefined,
      topics: selectedTopic !== "no-topics-available" ? selectedTopic : undefined,
      subtopic: selectedSubtopic && selectedSubtopic !== "any" ? selectedSubtopic : undefined
    };
    
    try {
      // Make an API call to fetch questions
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      
      console.log("Request data:", requestData); // Log request data
      console.log("Response:", response);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Data received:", data);
        
        if (data.questions && Array.isArray(data.questions)) {
            // Create a unique ID for the quiz
            const quizId = uuidv4();
            
            // Format the data for the Zustand store
            const formattedQuizData = {
              id: quizId,
              title: quizTitle || "Untitled Quiz",
              description: quizDescription || "",
              subject: selectedSubject,
              level: selectedLevel,
              difficulty: selectedDifficulty,
              paper: selectedPaper,
              section: selectedSection,
              topic: selectedTopic,
              subtopic: selectedSubtopic,
              questions: data.questions.map((q: any, index: number) => ({
                id: `question-${index}`,
                question: q.question,
                solution: data.solutions[index]?.solution || "",
                subject: selectedSubject,
                level: selectedLevel,
                topic: selectedTopic,
                section: selectedSection,
                subtopic: selectedSubtopic,
              })),
              solutions: data.solutions,
            };
            
            // Save to Zustand store
            setFormattedQuiz(formattedQuizData);
            
            // Save to database asynchronously (don't wait for it)
            try {
              // If you have user authentication, pass the user ID
              // const userId = session?.user?.id;
              saveQuizToDatabase(/* userId */);
            } catch (dbError) {
              console.error("Database save error:", dbError);
              // Continue anyway since we have the data in Zustand
            }
            
          // Just pass the entire data object (includes metadata)
          router.push(
            `/quiz/generated?questions=${encodeURIComponent(JSON.stringify(data))}`
          );
        } else {
            // Get error from data if available or use random message
            const errorMsg = data.error || errorMessages[Math.floor(Math.random() * errorMessages.length)];
            setErrorMessage(errorMsg);
            setDebugInfo(data);
        }
      } else {
          // Parse error response
          const errorData = await response.json();
          console.error("API Error:", errorData);
          setDebugInfo(errorData);
          
          // Show detailed error message in development
          if (process.env.NODE_ENV === 'development') {
            setErrorMessage(`Error: ${errorData.error}${errorData.details ? ` - ${errorData.details}` : ''} (${errorData.errorType || 'Unknown'})`);
          } else {
            // In production, show user-friendly message but include error type
            setErrorMessage(`${errorData.error || errorMessages[Math.floor(Math.random() * errorMessages.length)]} (${errorData.errorType || 'Unknown'})`);
          }
      }
    } catch (error) {
      console.error("Fetch error:", error);
        setErrorMessage(`Network error: ${error instanceof Error ? error.message : 'Unknown'}`);
        setDebugInfo({ networkError: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };
    
  // Function to get sections for any subject/paper
  const getSections = (subject: string, paper: string): string[] => {
    // Use the compatibility layer to get paper data directly
    const paperData = subjectUtils.getPaperData(subject, selectedLevel, paper);
    
    if (paperData && Array.isArray(paperData.sections) && paperData.sections.length > 0) {
      return paperData.sections;
    }
    
    return ["no-sections-available"];
  };

  // Helper function to display friendly subject names
  const getFriendlySubjectName = (subject: string): string => {
    // Get metadata directly from subject data
    const metadata = subjectUtils.getSubjectMetadata(subject);
    
    // If the subject data has a displayName, use it
    if (metadata.displayName) {
      return metadata.displayName;
    }
    
    // Otherwise use simple capitalization
    return subject.charAt(0).toUpperCase() + subject.slice(1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-2xl px-4 md:px-8">
      <Card className="w-full">
        <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Quiz Title</Label>
              <Input 
                placeholder="Enter quiz title..." 
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder="Enter quiz description..." 
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select
                  value={selectedSubject}
                  onValueChange={(value: string) => {
                    setSelectedSubject(value);
                    setErrorMessage(null);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {getFriendlySubjectName(subject)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level (Required)" />
                    </SelectTrigger>
                    <SelectContent>
                      {allLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedLevel && (
                  <>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select onValueChange={setSelectedDifficulty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {(subjectData[selectedSubject]?.difficulty || []).map((difficulty: string) => (
                            <SelectItem key={difficulty} value={difficulty}>
                              {difficulty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Only show paper dropdown for core subjects */}
                    {isCoreSubject(selectedSubject) && (
                      <div className="space-y-2">
                        <Label>{subjectUtils.getPaperLabel(selectedSubject)}</Label>
                        <Select onValueChange={setSelectedPaper}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${subjectUtils.getPaperLabel(selectedSubject).toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailablePapers(selectedSubject, selectedLevel).map((paper) => {
                              // Get paper display name from the level data if possible
                              const levelData = getDirectLevelData(selectedSubject, selectedLevel);
                              const paperName = levelData?.papers?.[paper]?.name || paper;
                              
                              return (
                                <SelectItem key={paper} value={paper}>
                                  {paperName}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* For non-core subjects, get data directly from the level data structure */}
                    {!isCoreSubject(selectedSubject) && (
                      <div className="space-y-2">
                        <Label>{getSectionLabel(selectedSubject)}</Label>
                        <Select onValueChange={(value) => {
                          // Skip setting the value if it's the placeholder
                          if (value !== "no-sections-available") {
                            setSelectedSection(value);
                          }
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${getSectionLabel(selectedSubject).toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Get sections directly from level data if possible */}
                            {(() => {
                              const levelData = getDirectLevelData(selectedSubject, selectedLevel);
                              let sections: string[] = [];
                              
                              // First check if we have a "papers" structure (like Physical Education)
                              if (levelData?.papers) {
                                // If there's only one paper, use its sections
                                const papers = Object.keys(levelData.papers);
                                if (papers.length === 1) {
                                  sections = levelData.papers[papers[0]]?.sections || [];
                                } else if (papers.length > 1) {
                                  // If there are multiple papers, use the "Both" paper's sections if it exists
                                  sections = levelData.papers["Both"]?.sections || 
                                            levelData.papers[papers[0]]?.sections || [];
                                }
                              }
                              // Then check if we have a "sections" structure (like Biology)
                              else if (levelData?.sections) {
                                // For biology-like structure, use the section names as options
                                const availableSections = Object.keys(levelData.sections);
                                sections = availableSections.map(sectionKey => {
                                  // Use the section name property if available, otherwise use the key
                                  return levelData.sections[sectionKey]?.name || sectionKey;
                                });
                              }
                              
                              // Fallback to compatibility layer if needed
                              if (sections.length === 0) {
                                sections = getSections(selectedSubject, "Both");
                              }
                              
                              console.log(`Available sections for ${selectedSubject}:`, sections);
                              
                              return sections.length > 0 ? 
                                sections.map((section) => (
                                  <SelectItem key={section} value={section}>
                                    {section}
                                  </SelectItem>
                                )) : 
                                <SelectItem value="Short Questions">Short Questions</SelectItem>;
                            })()}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Only show sections for core subjects with papers */}
                    {isCoreSubject(selectedSubject) && subjectUtils.hasSubjectSections(selectedSubject, selectedPaper) && (
                    <div className="space-y-2">
                        <Label>{getSectionLabel(selectedSubject)}</Label>
                        <Select onValueChange={(value) => {
                          // Skip setting the value if it's the placeholder
                          if (value !== "no-sections-available") {
                            setSelectedSection(value);
                          }
                        }}>
                        <SelectTrigger>
                            <SelectValue placeholder={`Select ${getSectionLabel(selectedSubject).toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {getSections(selectedSubject, selectedPaper).length > 0 ? 
                                getSections(selectedSubject, selectedPaper).map(
                            (section) => (
                              <SelectItem key={section} value={section}>
                                {section}
                              </SelectItem>
                                  )
                                ) : 
                                <SelectItem value="Short Questions">Short Questions</SelectItem>
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    )}

                    {/* Topic selection for non-core subjects - NEW */}
                    {!isCoreSubject(selectedSubject) && (
                      <div className="space-y-2">
                        <Label>{getTopicLabel(selectedSubject)}</Label>
                        <Select 
                          value={selectedTopic}
                          onValueChange={(value) => {
                            // Skip setting the value if it's the placeholder
                            if (value !== "no-topics-available") {
                              setSelectedTopic(value);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${getTopicLabel(selectedSubject).toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {(() => {
                              // Get topics directly using our utility function that handles paper selection internally
                              const topics = getAvailableTopics(selectedSubject, "");
                              console.log(`Rendering topics for ${selectedSubject}:`, topics);
                              
                              return topics.length > 0 ? 
                                topics.map((topic) => (
                                  <SelectItem key={topic} value={topic}>
                                    {topic}
                                  </SelectItem>
                                )) : 
                                <SelectItem value="no-topics-available">No {getTopicLabel(selectedSubject).toLowerCase()}s available</SelectItem>;
                            })()}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Topic selection for core subjects */}
                    {isCoreSubject(selectedSubject) && subjectUtils.hasPaperTopics(selectedSubject, selectedPaper) && (
                    <div className="space-y-2">
                        <Label>{getTopicLabel(selectedSubject)}</Label>
                        <Select onValueChange={(value) => {
                          // Skip setting the value if it's the placeholder
                          if (value !== "no-topics-available") {
                            setSelectedTopic(value);
                          }
                        }}>
                        <SelectTrigger>
                            <SelectValue placeholder={`Select ${getTopicLabel(selectedSubject).toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {getAvailableTopics(selectedSubject, selectedPaper).length > 0 ? 
                                getAvailableTopics(selectedSubject, selectedPaper).map(
                                  (topic) => (
                                    <SelectItem key={topic} value={topic}>
                                      {topic}
                                    </SelectItem>
                                  )
                                ) : 
                                <SelectItem value="no-topics-available">No {getTopicLabel(selectedSubject).toLowerCase()}s available</SelectItem>
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    )}

                    {selectedTopic !== "Random" && selectedTopic !== "no-topics-available" && availableSubtopics.length > 0 && (
                    <div className="space-y-2">
                        <Label>{getSubtopicLabel(selectedSubject)}</Label>
                        <Select onValueChange={setSelectedSubtopic}>
                        <SelectTrigger>
                            <SelectValue placeholder={`Select ${getSubtopicLabel(selectedSubject).toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">Any {getSubtopicLabel(selectedSubject).toLowerCase()}</SelectItem>
                          {availableSubtopics.map((subtopic) => (
                              <SelectItem key={subtopic} value={subtopic || `subtopic-${Math.random()}`}>
                                {subtopic || "Unnamed subtopic"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    )}
                  </>
                )}
            </div>
           
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {/* Show progress bar only when loading */}
          {loading && (
            <div className="w-full">
              <div className="text-center mb-2">Generating quiz...</div>
              <Progress value={progress} className="w-full h-2" />
            </div>
          )}
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Please wait..." : "Generate Questions"}
          </Button>
        </CardFooter>
      </Card>

      {errorMessage && (
        <div className="mt-6 mx-auto max-w-2xl px-4 md:px-8">
          <Card className="bg-red-50">
            <CardContent className="pt-6">
              <div className="text-red-600 mb-2">{errorMessage}</div>
              
              {/* Debug toggle - only in development */}
              {process.env.NODE_ENV === 'development' && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setShowDebug(!showDebug)}
                  >
                    {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
                  </Button>
                  
                  {showDebug && debugInfo && (
                    <div className="mt-4 p-4 bg-gray-900 text-gray-100 rounded-md overflow-x-auto">
                      <pre className="text-xs">{JSON.stringify(debugInfo, null, 2)}</pre>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </form>
  );
}
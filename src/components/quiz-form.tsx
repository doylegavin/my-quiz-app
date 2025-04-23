//src/components//quiz-form.tsx

"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import subjectData from "@/data/subjects";
import { getSubjectData } from "@/lib/utils/subjectUtils";
// Import mathematics data
import { higherLevel as mathsHigherLevel, ordinaryLevel as mathsOrdinaryLevel, foundationLevel as mathsFoundationLevel } from "@/data/subjects/mathematics";

export function QuizForm() {
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

  // Define levels for each subject
  const getAvailableLevels = (subject: string): string[] => {
    const currentSubject = subjectData[subject];
    if (currentSubject && Array.isArray(currentSubject.levels)) {
      return currentSubject.levels;
    }
    return ["Higher Level", "Ordinary Level"];
  };

  // Get available levels based on current subject
  const allLevels = getAvailableLevels(selectedSubject);

  // Set a valid level when subject changes
  useEffect(() => {
    const levels = getAvailableLevels(selectedSubject);
    if (!levels.includes(selectedLevel)) {
      setSelectedLevel(levels[0]);
    }
    
    // Reset paper selection when subject changes to prevent undefined errors
    const currentSubject = subjectData[selectedSubject];
    if (currentSubject && currentSubject.papers) {
      const availablePapers = Object.keys(currentSubject.papers);
      if (availablePapers.length > 0 && !availablePapers.includes(selectedPaper)) {
        setSelectedPaper(availablePapers[0]);
      }
    }
  }, [selectedSubject, selectedLevel]);

  // Update available subtopics when selectedTopic changes
  useEffect(() => {
    if (selectedTopic !== "Random") {
      try {
        // Special case for mathematics
        if (selectedSubject === "mathematics") {
          const mathsData = selectedLevel === "Higher Level" 
            ? mathsHigherLevel?.mathematics 
            : selectedLevel === "Ordinary Level" 
              ? mathsOrdinaryLevel?.mathematics 
              : mathsFoundationLevel?.mathematics;
          
          // Map paper name to correct format for level files
          const levelPaperName = mapPaperName(selectedSubject, selectedPaper, true);
            
          if (mathsData && mathsData.papers && mathsData.papers[levelPaperName]) {
            const paperTopics = mathsData.papers[levelPaperName].topics;
            if (paperTopics && paperTopics[selectedTopic] && Array.isArray(paperTopics[selectedTopic])) {
              setAvailableSubtopics(paperTopics[selectedTopic]);
            } else {
              setAvailableSubtopics([]);
            }
          } else {
            setAvailableSubtopics([]);
          }
        } else {
          // Standard approach for other subjects
          const currentSubject = subjectData[selectedSubject];
          if (!currentSubject || !currentSubject.papers) {
            setAvailableSubtopics([]);
            return;
          }
          
          const selectedPaperData = currentSubject.papers[selectedPaper];
          
          if (selectedPaperData && selectedPaperData.topics) {
            const topicData = selectedPaperData.topics[selectedTopic];
            if (Array.isArray(topicData)) {
              setAvailableSubtopics(topicData);
            } else {
              setAvailableSubtopics([]);
            }
          } else {
            setAvailableSubtopics([]);
          }
        }
        
        setSelectedSubtopic(""); // Reset subtopic when topic changes
      } catch (error) {
        console.error("Error updating subtopics:", error);
        setAvailableSubtopics([]);
      }
    } else {
      setAvailableSubtopics([]);
      setSelectedSubtopic("");
    }
  }, [selectedTopic, selectedPaper, selectedLevel, selectedSubject]);

  // Reset default selections when subject changes
  useEffect(() => {
    const currentSubject = subjectData[selectedSubject];
    if (currentSubject) {
      // Set default difficulty
      const availableDifficulties = currentSubject.difficulty || [];
      if (availableDifficulties.length > 0 && !availableDifficulties.includes(selectedDifficulty)) {
        setSelectedDifficulty(availableDifficulties[0]);
      }
      
      // Set default paper if not already set
      const availablePapers = Object.keys(currentSubject.papers || {});
      if (availablePapers.length > 0 && !availablePapers.includes(selectedPaper)) {
        const newPaper = availablePapers[0];
        setSelectedPaper(newPaper);
        
        // Set default section for the new paper
        const paperData = currentSubject.papers[newPaper];
        if (paperData && paperData.sections) {
          const sections = paperData.sections;
          if (sections.length > 0) {
            setSelectedSection(sections[0]);
          } else {
            setSelectedSection("Short Questions");
          }
          
          // Set default topic for the new paper
          if (paperData.topics) {
            const topics = Object.keys(paperData.topics);
            if (topics.length > 0) {
              setSelectedTopic(topics[0]);
            } else {
              setSelectedTopic("Random");
            }
          }
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
    if (!selectedLevel) {
      alert("Please select a level.");
      setLoading(false);
      return;
    }
    
    // Check for placeholder values
    if (
      (hasSubjectSections(selectedSubject, selectedPaper) && selectedSection === "no-sections-available") || 
      (hasPaperTopics(selectedSubject, selectedPaper) && selectedTopic === "no-topics-available")
    ) {
      alert("Please select valid options for all fields.");
      setLoading(false);
      return;
    }
    
    simulateProgress();
    
    // Prepare the data to send to the API
    const requestData = {
      subject: selectedSubject,
      difficulty: selectedDifficulty,
      level: selectedLevel,
      paper: selectedPaper,
      paperType: getPaperLabel(selectedSubject).toLowerCase(),
      // Only include sections if the subject has them
      ...(hasSubjectSections(selectedSubject, selectedPaper) && { sections: selectedSection }),
      // Only include topics if the subject has them
      ...(hasPaperTopics(selectedSubject, selectedPaper) && { topics: selectedTopic }),
      // Add subtopic if it exists and is selected (and not "any")
      ...(hasPaperTopics(selectedSubject, selectedPaper) && 
          selectedSubtopic && 
          selectedSubtopic !== "any" && 
          { subtopic: selectedSubtopic })
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
          // Just pass the entire data object (includes metadata)
          router.push(
            `/quiz/generated?questions=${encodeURIComponent(JSON.stringify(data))}`
          );
        } else {
          setErrorMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
        }
      } else {
        setErrorMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
    } finally {
      setLoading(false);
    }
  };

  // Add more comprehensive label mappings for papers, sections, and topics
  const getPaperLabel = (subject: string): string => {
    // Custom labels for different subjects
    const paperLabels: Record<string, string> = {
      // Languages
      french: "Component",
      irish: "Component",
      spanish: "Component",
      german: "Component",
      italian: "Component",
      japanese: "Component",
      
      // Sciences
      physics: "Paper",
      chemistry: "Section",
      biology: "Unit",
      
      // Practical subjects
      physicalEducation: "Strand",
      engineering: "Paper",
      technology: "Component",
      constructionstudies: "Component",
      designandcommunicationgraphics: "Paper",
      
      // Mathematics and related
      mathematics: "Paper",
      appliedmathematics: "Paper",
      
      // Arts and humanities
      music: "Component",
      art: "Component",
      dramafilmandtheatrestudies: "Component",
      history: "Paper",
      geography: "Paper"
    };
    
    return paperLabels[subject] || "Paper";
  };

  // Enhanced section label mappings
  const getSectionLabel = (subject: string): string => {
    // Custom labels for different subjects
    const sectionLabels: Record<string, string> = {
      // Languages
      french: "Skill Area",
      spanish: "Skill Area",
      irish: "Skill Area",
      
      // Sciences
      physics: "Topic Area",
      chemistry: "Topic Group",
      biology: "Unit",
      
      // Practical subjects
      physicalEducation: "Module",
      engineering: "Area",
      technology: "Area",
      constructionstudies: "Area",
      
      // Mathematics and related
      mathematics: "Section",
      appliedmathematics: "Section",
      
      // Arts and humanities
      music: "Domain",
      art: "Element",
      history: "Period",
      geography: "Theme"
    };
    
    return sectionLabels[subject] || "Section";
  };

  // Enhanced topic label mappings
  const getTopicLabel = (subject: string): string => {
    // Custom labels for different subjects
    const topicLabels: Record<string, string> = {
      // Languages
      french: "Theme",
      spanish: "Theme",
      irish: "Theme",
      
      // Sciences
      physics: "Concept",
      chemistry: "Category",
      biology: "Topic",
      
      // Practical subjects
      physicalEducation: "Area",
      engineering: "Concept",
      technology: "Skill Area",
      
      // Mathematics and related
      mathematics: "Topic",
      appliedmathematics: "Area",
      
      // Arts and humanities
      music: "Focus",
      art: "Medium",
      history: "Theme",
      geography: "Region"
    };
    
    return topicLabels[subject] || "Topic";
  };

  // Add a function to get the subtopic label based on the selected subject
  const getSubtopicLabel = (subject: string): string => {
    // Custom labels for different subjects
    const subtopicLabels: Record<string, string> = {
      // Languages
      french: "Focus Point",
      spanish: "Focus Point",
      irish: "Focus Point",
      
      // Sciences
      physics: "Specific Topic",
      chemistry: "Example",
      biology: "Application",
      
      // Practical subjects
      physicalEducation: "Skill",
      engineering: "Application",
      technology: "Technique",
      
      // Mathematics and related
      mathematics: "Problem Type",
      appliedmathematics: "Example",
      
      // Arts and humanities
      music: "Example",
      art: "Technique",
      history: "Case Study",
      geography: "Case Study"
    };
    
    return subtopicLabels[subject] || "Subtopic";
  };

  // Add helper function to map paper names between different formats
  const mapPaperName = (subject: string, paper: string, toLevel: boolean = false): string => {
    // If subject is mathematics, map between index.ts and level files naming conventions
    if (subject === "mathematics") {
      if (toLevel) {
        // Map from index.ts format to level file format
        const mapping: Record<string, string> = {
          "Both": "Both",
          "Paper 1": "paper1",
          "Paper 2": "paper2"
        };
        return mapping[paper] || paper;
      } else {
        // Map from level file format to index.ts format
        const mapping: Record<string, string> = {
          "Both": "Both",
          "paper1": "Paper 1",
          "paper2": "Paper 2"
        };
        return mapping[paper] || paper;
      }
    }
    return paper;
  };

  // Add a function to determine if the paper structure implies it has topics
  const hasPaperTopics = (subject: string, paper: string): boolean => {
    const currentSubject = subjectData[subject];
    if (!currentSubject || !currentSubject.papers || !currentSubject.papers[paper]) {
      return false;
    }
    
    const paperData = currentSubject.papers[paper];
    
    // Special case for mathematics since it has a different structure
    if (subject === "mathematics") {
      // For mathematics, check structure in the higher-level or relevant level file
      try {
        // Try to access the mathematics specific structure from the appropriate level
        const mathsData = selectedLevel === "Higher Level" 
          ? mathsHigherLevel?.mathematics 
          : selectedLevel === "Ordinary Level" 
            ? mathsOrdinaryLevel?.mathematics 
            : mathsFoundationLevel?.mathematics;

        if (mathsData && mathsData.papers) {
          // Map paper name to correct format for level files
          const levelPaperName = mapPaperName(subject, paper, true);
          
          if (mathsData.papers[levelPaperName]) {
            return !!mathsData.papers[levelPaperName].topics && Object.keys(mathsData.papers[levelPaperName].topics).length > 0;
          }
        }
      } catch (error) {
        console.error("Error checking maths paper topics:", error);
      }
    }
    
    // Standard check for other subjects
    return !!paperData.topics && Object.keys(paperData.topics).length > 0;
  };

  // Add a function to check if a subject has sections, with special handling for mathematics
  const hasSubjectSections = (subject: string, paper: string): boolean => {
    const currentSubject = subjectData[subject];
    if (!currentSubject || !currentSubject.papers || !currentSubject.papers[paper]) {
      return false;
    }
    
    // Special case for mathematics since it has a different structure
    if (subject === "mathematics") {
      try {
        // Try to access the mathematics specific structure from the appropriate level
        const mathsData = selectedLevel === "Higher Level" 
          ? mathsHigherLevel?.mathematics 
          : selectedLevel === "Ordinary Level" 
            ? mathsOrdinaryLevel?.mathematics 
            : mathsFoundationLevel?.mathematics;

        if (mathsData && mathsData.papers) {
          // Map paper name to correct format for level files
          const levelPaperName = mapPaperName(subject, paper, true);
          
          if (mathsData.papers[levelPaperName] && mathsData.papers[levelPaperName].sections) {
            return Array.isArray(mathsData.papers[levelPaperName].sections) && 
                   mathsData.papers[levelPaperName].sections.length > 0;
          }
        }
        return true; // Default to true for mathematics to show sections
      } catch (error) {
        console.error("Error checking maths sections:", error);
        return true; // Default to true on error
      }
    }
    
    const paperData = currentSubject.papers[paper];
    return Array.isArray(paperData.sections) && paperData.sections.length > 0;
  };

  // Add a function to get mathematics sections
  const getMathsSections = (paper: string): string[] => {
    try {
      const mathsData = selectedLevel === "Higher Level" 
        ? mathsHigherLevel?.mathematics 
        : selectedLevel === "Ordinary Level" 
          ? mathsOrdinaryLevel?.mathematics 
          : mathsFoundationLevel?.mathematics;
      
      // Map paper name to correct format for level files
      const levelPaperName = mapPaperName("mathematics", paper, true);
        
      if (mathsData && mathsData.papers && mathsData.papers[levelPaperName]) {
        const paperSections = mathsData.papers[levelPaperName].sections;
        if (Array.isArray(paperSections) && paperSections.length > 0) {
          return paperSections;
        }
      }
      return ["Short Questions", "Long Questions"]; // Default sections for mathematics
    } catch (error) {
      console.error("Error getting maths sections:", error);
      return ["Short Questions", "Long Questions"]; // Default sections on error
    }
  };

  // Add a function to get mathematics topics
  const getMathsTopics = (paper: string): string[] => {
    try {
      const mathsData = selectedLevel === "Higher Level" 
        ? mathsHigherLevel?.mathematics 
        : selectedLevel === "Ordinary Level" 
          ? mathsOrdinaryLevel?.mathematics 
          : mathsFoundationLevel?.mathematics;
      
      // Map paper name to correct format for level files
      const levelPaperName = mapPaperName("mathematics", paper, true);
        
      if (mathsData && mathsData.papers && mathsData.papers[levelPaperName]) {
        const paperTopics = mathsData.papers[levelPaperName].topics;
        if (paperTopics) {
          return Object.keys(paperTopics);
        }
      }
      return [];
    } catch (error) {
      console.error("Error getting maths topics:", error);
      return [];
    }
  };

  // Add a function to check if a paper has subtopics
  const hasSubtopics = (subject: string, paper: string, section?: string, topic?: string): boolean => {
    if (!subject || !paper || subject === 'placeholder' || paper === 'placeholder') {
      return false;
    }
    
    try {
      // Special case for mathematics
      if (subject === "mathematics") {
        // For maths, check if the selected topic has subtopics (array with length > 0)
        const mathsData = selectedLevel === "Higher Level" 
          ? mathsHigherLevel?.mathematics 
          : selectedLevel === "Ordinary Level" 
            ? mathsOrdinaryLevel?.mathematics 
            : mathsFoundationLevel?.mathematics;
        
        // Map paper name to correct format for level files
        const levelPaperName = mapPaperName(subject, paper, true);
            
        if (mathsData && mathsData.papers && mathsData.papers[levelPaperName] && topic) {
          const paperTopics = mathsData.papers[levelPaperName].topics;
          return !!paperTopics && !!paperTopics[topic] && paperTopics[topic].length > 0;
        }
        return false;
      }
      
      // Standard approach for other subjects
      const subjectDataParam = getSubjectData(subject);
      if (!subjectDataParam || !subjectDataParam.papers) return false;
      
      const paperData = subjectDataParam.papers[paper];
      if (!paperData) return false;
      
      // If we have sections and topics
      if (section && section !== 'placeholder' && topic && topic !== 'placeholder' && paperData.sections) {
        const sectionData = paperData.sections[section];
        if (sectionData && sectionData.topics) {
          const topicData = sectionData.topics[topic];
          return !!topicData && !!topicData.subtopics && Object.keys(topicData.subtopics).length > 0;
        }
      }
      
      // If we have just topics without sections
      if (topic && topic !== 'placeholder' && paperData.topics) {
        const topicData = paperData.topics[topic];
        return !!topicData && !!topicData.subtopics && Object.keys(topicData.subtopics).length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error checking for subtopics:", error);
      return false;
    }
  };

  // Add a function to get subtopics for a given paper, section, and topic
  const getSubtopics = (subject: string, paper: string, section?: string, topic?: string): string[] => {
    if (!subject || !paper || subject === 'placeholder' || paper === 'placeholder') {
      return [];
    }
    
    try {
      // Special case for mathematics
      if (subject === "mathematics") {
        // For maths, return the array of subtopics for the selected topic
        const mathsData = selectedLevel === "Higher Level" 
          ? mathsHigherLevel?.mathematics 
          : selectedLevel === "Ordinary Level" 
            ? mathsOrdinaryLevel?.mathematics 
            : mathsFoundationLevel?.mathematics;
        
        // Map paper name to correct format for level files
        const levelPaperName = mapPaperName(subject, paper, true);
            
        if (mathsData && mathsData.papers && mathsData.papers[levelPaperName] && topic) {
          const paperTopics = mathsData.papers[levelPaperName].topics;
          if (paperTopics && paperTopics[topic] && Array.isArray(paperTopics[topic])) {
            return paperTopics[topic];
          }
        }
        return [];
      }
      
      // Standard approach for other subjects
      const subjectDataParam = getSubjectData(subject);
      if (!subjectDataParam || !subjectDataParam.papers) return [];
      
      const paperData = subjectDataParam.papers[paper];
      if (!paperData) return [];
      
      // If we have sections and topics
      if (section && section !== 'placeholder' && topic && topic !== 'placeholder' && paperData.sections) {
        const sectionData = paperData.sections[section];
        if (sectionData && sectionData.topics) {
          const topicData = sectionData.topics[topic];
          if (topicData && topicData.subtopics) {
            return Object.keys(topicData.subtopics);
          }
        }
      }
      
      // If we have just topics without sections
      if (topic && topic !== 'placeholder' && paperData.topics) {
        const topicData = paperData.topics[topic];
        if (topicData && topicData.subtopics) {
          return Object.keys(topicData.subtopics);
        }
      }
      
      return [];
    } catch (error) {
      console.error("Error getting subtopics:", error);
      return [];
    }
  };

  return (
    <><form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-2xl px-4 md:px-8">
<Card className="w-full">
        <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Quiz Title</Label>
              <Input placeholder="Enter quiz title..." />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter quiz description..." />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select onValueChange={setSelectedSubject} defaultValue="mathematics">
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(subjectData).map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject.charAt(0).toUpperCase() + subject.slice(1)}
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

                    <div className="space-y-2">
                      <Label>{getPaperLabel(selectedSubject)}</Label>
                      <Select onValueChange={setSelectedPaper}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${getPaperLabel(selectedSubject).toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(subjectData[selectedSubject]?.papers || {}).map(
                            ([key, paper]: [string, any]) => (
                              <SelectItem key={key} value={key}>
                                {paper.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {hasSubjectSections(selectedSubject, selectedPaper) && (
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
                            {selectedSubject === "mathematics" ? (
                              // For mathematics, get sections from the level-specific data
                              getMathsSections(selectedPaper).length > 0 ? 
                                getMathsSections(selectedPaper).map(
                                  (section) => (
                                    <SelectItem key={section} value={section}>
                                      {section}
                                    </SelectItem>
                                  )
                                ) : 
                                <SelectItem value="Short Questions">Short Questions</SelectItem>
                            ) : (
                              // For other subjects, use the standard approach
                              subjectData[selectedSubject]?.papers[selectedPaper]?.sections?.length > 0 ? 
                                subjectData[selectedSubject]?.papers[selectedPaper]?.sections?.map(
                                  (section: string) => (
                                    <SelectItem key={section} value={section}>
                                      {section}
                                    </SelectItem>
                                  )
                                ) : (
                                  <SelectItem value="Short Questions">Short Questions</SelectItem>
                                )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {hasPaperTopics(selectedSubject, selectedPaper) && (
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
                            {selectedSubject === "mathematics" ? (
                              // For mathematics, get topics from the level-specific data
                              getMathsTopics(selectedPaper).length > 0 ? 
                                getMathsTopics(selectedPaper).map(
                                  (topic) => (
                                    <SelectItem key={topic} value={topic}>
                                      {topic}
                                    </SelectItem>
                                  )
                                ) : 
                                <SelectItem value="no-topics-available">No {getTopicLabel(selectedSubject).toLowerCase()}s available</SelectItem>
                            ) : (
                              // For other subjects, use the standard approach
                              Object.keys(subjectData[selectedSubject]?.papers[selectedPaper]?.topics || {}).length > 0 ? 
                                Object.keys(subjectData[selectedSubject]?.papers[selectedPaper]?.topics || {}).map(
                                  (topics) => (
                                    <SelectItem key={topics} value={topics}>
                                      {topics}
                                    </SelectItem>
                                  )
                                ) : 
                                <SelectItem value="no-topics-available">No {getTopicLabel(selectedSubject).toLowerCase()}s available</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {selectedTopic !== "Random" && availableSubtopics.length > 0 && (
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
      </Card>

      <div className="flex justify-end mt-8 pb-16">
        <Button type="submit" className="btn-primary" >{loading ? "Generating..." : "Generate Questions"}</Button>
      </div>

      {errorMessage && (
        <div className="fixed bottom-16 left-3/4 transform -translate-x-1/2 z-50 md:bottom-12 md:left-auto md:right-8 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <span>{errorMessage}</span>
    <button
      onClick={() => setErrorMessage(null)}
      className="ml-2 text-white font-bold text-lg leading-none"
      >
      ✖
    </button>
  </div>
)}


      {loading && (
        <div className="w-full mb-4">
            <Progress value={progress} />
          </div>
        )}
    </form></>
    
  );
}
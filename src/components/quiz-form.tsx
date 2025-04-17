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
import { mathsHigherLevel, mathsOrdinaryLevel, mathsFoundationLevel } from "@/data/subjects/mathematics";
import { physicalEducationHigherLevel } from "@/data/subjects/physical-education";

type Paper = {
  name: string;
  sections: string[];
  topics: { [topic: string]: string[] };
};

type PaperOptions = Record<string, Paper>; // ✅ Ensures `papers` is correctly indexed

type Subject = {
  difficulty: string[];
  papers: PaperOptions;
  levels: string[];
};

type SubjectStructure = Record<string, Subject>; // ✅ Ensures correct key usage

// Replace hardcoded structures with imports
const ExamStructureHL: SubjectStructure = {
  mathematics: mathsHigherLevel.mathematics,
  physicalEducation: physicalEducationHigherLevel.physicalEducation
};

const ExamStructureOL: SubjectStructure = {
  mathematics: mathsOrdinaryLevel.mathematics
};

const ExamStructureFL: SubjectStructure = {
  mathematics: mathsFoundationLevel.mathematics
};

// Update this to use the imported physical education data
const ExamStructureLCPE: SubjectStructure = {
  physicalEducation: physicalEducationHigherLevel.physicalEducation
};

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
  const getAvailableLevels = (subject: string) => {
    if (subject === "mathematics") {
      return ["Higher Level", "Ordinary Level", "Foundation Level"];
    } else if (subject === "physicalEducation") {
      return ["Higher Level"];
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
    // Get the first available paper for the selected subject
    const currentExamStructure = getExamStructure();
    if (currentExamStructure && currentExamStructure[selectedSubject]) {
      const availablePapers = Object.keys(currentExamStructure[selectedSubject].papers || {});
      if (availablePapers.length > 0 && !availablePapers.includes(selectedPaper)) {
        setSelectedPaper(availablePapers[0]);
      }
    }
  }, [selectedSubject, selectedLevel]);

  const getExamStructure = () => {
    if (selectedLevel === "Higher Level") {
      return ExamStructureHL;
    } 
    if (selectedLevel === "Ordinary Level") {
      // Check if the selected subject is available in OL
      if (selectedSubject === "physicalEducation") {
        return ExamStructureLCPE; // Physical Education is only in HL and LCPE structures
      }
      return ExamStructureOL;
    }
    return ExamStructureFL; // Foundation Level
  };
  
  // Get the exam structure AFTER a level has been selected
  const examStructure = selectedLevel ? getExamStructure() : ExamStructureHL; // Default to HL for initial UI

  // Update available subtopics when selectedTopic changes
  useEffect(() => {
    if (selectedLevel !== "Foundation Level" && selectedTopic !== "Random") {
      try {
        const currentExamStructure = getExamStructure();
        if (!currentExamStructure || !currentExamStructure[selectedSubject]) {
          setAvailableSubtopics([]);
          return;
        }
        
        // Type assert that selectedPaper is a key of the papers object
        const paperKey = selectedPaper as keyof typeof currentExamStructure[typeof selectedSubject]['papers'];
        const selectedPaperData = currentExamStructure[selectedSubject]?.papers[paperKey];
        
        if (selectedPaperData && 'topics' in selectedPaperData) {
          // Check if topics is an object and if selectedTopic exists in it
          if (typeof selectedPaperData.topics === 'object' && selectedTopic in selectedPaperData.topics) {
            const subtopics = selectedPaperData.topics[selectedTopic] || [];
            setAvailableSubtopics(subtopics);
          } else {
            setAvailableSubtopics([]);
          }
        } else {
          setAvailableSubtopics([]);
        }
      } catch (error) {
        console.error("Error updating subtopics:", error);
        setAvailableSubtopics([]);
      }

      setSelectedSubtopic(""); // Reset subtopic when topic changes
    } else {
      setAvailableSubtopics([]);
      setSelectedSubtopic("");
    }
  }, [selectedTopic, selectedPaper, selectedLevel, selectedSubject]);

  // Reset default selections when subject changes
  useEffect(() => {
    const currentExamStructure = getExamStructure();
    if (currentExamStructure && currentExamStructure[selectedSubject]) {
      // Set default difficulty
      const availableDifficulties = currentExamStructure[selectedSubject].difficulty || [];
      if (availableDifficulties.length > 0 && !availableDifficulties.includes(selectedDifficulty)) {
        setSelectedDifficulty(availableDifficulties[0]);
      }
      
      // Set default paper if not already set
      const availablePapers = Object.keys(currentExamStructure[selectedSubject].papers || {});
      if (availablePapers.length > 0 && !availablePapers.includes(selectedPaper)) {
        const newPaper = availablePapers[0];
        setSelectedPaper(newPaper);
        
        // Set default section for the new paper
        const sections = currentExamStructure[selectedSubject]?.papers[newPaper]?.sections || [];
        if (sections.length > 0) {
          setSelectedSection(sections[0]);
        } else {
          // Reset to default if no sections available
          setSelectedSection("Short Questions");
        }
        
        // Set default topic for the new paper
        const topics = Object.keys(currentExamStructure[selectedSubject]?.papers[newPaper]?.topics || {});
        if (topics.length > 0) {
          setSelectedTopic(topics[0]);
        } else {
          // Reset to default if no topics available
          setSelectedTopic("Random");
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
  
  
  
 // handleSubmit function for quiz-form.tsx

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  if (!selectedLevel) {
    alert("Please select a level.");
    setLoading(false);
    return;
  }
  
  // Check for placeholder values
  if (selectedSection === "no-sections-available" || selectedTopic === "no-topics-available") {
    alert("Please select valid sections and topics.");
    setLoading(false);
    return;
  }
  
  simulateProgress();
  
  // Prepare the data to send to the API
  const requestData = {
    subject: selectedSubject,
    difficulty: selectedDifficulty,
    topics: selectedTopic,
    level: selectedLevel,
    paper: selectedPaper,
    paperType: selectedSubject === "physicalEducation" ? "strand" : "paper",
    sections: selectedSection,
    // Add subtopic if it exists in your form
    ...(selectedSubtopic && { subtopic: selectedSubtopic })
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
                          {(examStructure[selectedSubject]?.difficulty || []).map((difficulty) => (
                            <SelectItem key={difficulty} value={difficulty}>
                              {difficulty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{selectedSubject === "physicalEducation" ? "Strand" : "Paper"}</Label>
                      <Select onValueChange={setSelectedPaper}>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedSubject === "physicalEducation" ? "Select strand" : "Select paper"} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(examStructure[selectedSubject]?.papers || {}).map(
                            ([key, paper]) => (
                              <SelectItem key={key} value={key}>
                                {paper.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Section</Label>
                      <Select onValueChange={(value) => {
                        // Skip setting the value if it's the placeholder
                        if (value !== "no-sections-available") {
                          setSelectedSection(value);
                        }
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Short Questions" />
                        </SelectTrigger>
                        <SelectContent>
                          {examStructure[selectedSubject]?.papers[selectedPaper]?.sections?.length > 0 ? 
                            examStructure[selectedSubject]?.papers[selectedPaper]?.sections?.map(
                              (section) => (
                                <SelectItem key={section} value={section}>
                                  {section}
                                </SelectItem>
                              )
                            ) : 
                            <SelectItem value="no-sections-available">No sections available</SelectItem>
                          }
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Topic</Label>
                      <Select onValueChange={(value) => {
                        // Skip setting the value if it's the placeholder
                        if (value !== "no-topics-available") {
                          setSelectedTopic(value);
                        }
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(examStructure[selectedSubject]?.papers[selectedPaper]?.topics || {}).length > 0 ? 
                            Object.keys(examStructure[selectedSubject]?.papers[selectedPaper]?.topics || {}).map(
                              (topics) => (
                                <SelectItem key={topics} value={topics}>
                                  {topics}
                                </SelectItem>
                              )
                            ) : 
                            <SelectItem value="no-topics-available">No topics available</SelectItem>
                          }
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Subtopic</Label>
                      <Select onValueChange={setSelectedSubtopic} disabled={availableSubtopics.length === 0}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subtopic" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSubtopics.map((subtopic) => (
                            <SelectItem key={subtopic} value={subtopic}>
                              {subtopic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
/* english: {
  difficulty: ["Easy", "Medium", "Hard"],
  papers: {
    paper1: {
      name: "Paper 1 (Language and Comprehension)",
      sections: ["Comprehension", "Composition"],
      topics: [
        "Language Analysis",
        "Comprehension",
        "Discursive Essay",
        "Personal Essay",
        "Descriptive Essay",
        "Short Story"
      ]
    },
    paper2: {
      name: "Paper 2 (Literature)",
      sections: ["Single Text", "Comparative Study", "Poetry"],
      topics: [
        "Character Analysis",
        "Theme Analysis",
        "Comparative Modes",
        "Poetry Analysis",
        "Unseen Poetry"
      ]
    }
  },
  levels: ["Higher Level", "Ordinary Level"]
},
irish: {
  difficulty: ["Easy", "Medium", "Hard"],
  papers: {
    paper1: {
      name: "Paper 1 (Language and Composition)",
      sections: ["Reading Comprehension", "Composition"],
      topics: [
        "Comprehension",
        "Language Use",
        "Personal Essay",
        "Discursive Essay",
        "Story Writing"
      ]
    },
    paper2: {
      name: "Paper 2 (Literature and Oral)",
      sections: ["Prose", "Poetry", "Unseen Texts"],
      topics: [
        "Prose Analysis",
        "Poetry Analysis",
        "Oral Comprehension",
        "Aural Comprehension"
      ]
    }
  },
  levels: ["Higher Level", "Ordinary Level"]
} */
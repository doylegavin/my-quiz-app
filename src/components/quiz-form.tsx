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


type PaperOptions = {
  [key: string]: {
    name: string;
    sections: string[];
    topics: string[];
  };
};

type SubjectStructure = {
  [key: string]: {
    difficulty: string[];
    papers: PaperOptions;
    levels: string[];
  };
};

const examStructure: SubjectStructure = {
  mathematics: {
    
    papers: {

      Both: {
        name: "Both",
        sections: ["Short Questions", "Long Questions"],
        topics: [
          "Random",
          "Algebra",
          "Complex Numbers",
          "Sequences and Series",
          "Functions",
          "Calculus",
          "Financial Maths",
          "Proof by Induction",
          "Geometry",
          "Trigonometry",
          "Coordinate Geometry The Line",
           "Coordinate Geometry The Circle",
          "Probability",
          "Statistics",
          "Constructions"
        ]
      },

      paper1: {
        name: "Paper 1",
        sections: [ "Short Questions", "Long Questions"],
        topics: [
          "Random",
          "Algebra",
          "Complex Numbers",
          "Sequences and Series",
          "Functions",
          "Calculus",
          "Financial Maths",
          "Proof by Induction"
          
        ]
      },
      paper2: {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: [
          "Random",
          "Geometry",
          "Trigonometry",
          "Coordinate Geometry The Line",
           "Coordinate Geometry The Circle",
          "Probability",
          "Statistics",
          "Constructions"
        ]
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level", "Foundation Level"]
  },
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
};

export function QuizForm() {
  const [selectedSubject, setSelectedSubject] = useState<string>("mathematics");
  const [selectedPaper, setSelectedPaper] = useState<string>("Both");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Random");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("Short Questions");
  const [selectedTopic, setSelectedTopic] = useState<string>("Random");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* useEffect(() => {
    setErrorMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
  }, []); */
  
  

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



//submit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
    if (!selectedLevel) {
      alert("Please select a level.");
      setLoading(false);
      return;
    }
  simulateProgress();


  // Prepare the data to send to the API
  const requestData = {
    subject: selectedSubject,
    difficulty: selectedDifficulty,
    topic: selectedTopic,
    level: selectedLevel,
    paper: selectedPaper,
    sections: selectedSection,
  };

  try {
    // Make an API call to fetch questions
    const response = await fetch("/api/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    console.log("Response:", response); // Log the raw response

    if (response.ok) {
      const data = await response.json();
      console.log("Data received:", data);
  
      if (data.questions && Array.isArray(data.questions)) {
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
                    {Object.keys(examStructure).map((subject) => (
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
                      {examStructure[selectedSubject].levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>


                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {examStructure[selectedSubject].difficulty.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Paper</Label>
                  <Select onValueChange={setSelectedPaper}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select paper" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(examStructure[selectedSubject].papers).map(
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
                  <Select onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Short Questions" />
                    </SelectTrigger>
                    <SelectContent>
                      {examStructure[selectedSubject].papers[selectedPaper].sections.map(
                        (section) => (
                          <SelectItem key={section} value={section}>
                            {section}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Select onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {examStructure[selectedSubject].papers[selectedPaper].topics.map(
                        (topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
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
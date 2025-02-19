//src/components//quiz-form.tsx

"use client";

import { useState } from "react";
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
  english: {
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
  }
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
    const response = await fetch("/api/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    console.log("Response:", response);

    if (response.ok) {
      const data = await response.json();
      console.log("Data received:", data);

      if (data.questions && Array.isArray(data.questions)) {
        // Encode query params with selected fields
        const queryParams = new URLSearchParams({
          questions: JSON.stringify(data),
          subject: selectedSubject,
          level: selectedLevel,
          difficulty: selectedDifficulty,
          paper: selectedPaper,
          section: selectedSection,
          topic: selectedTopic
        });

        router.push(`/quiz/generated?${queryParams.toString()}`);
      } else {
        console.error("Questions data is missing or invalid.");
      }
    } else {
      const errorData = await response.json();
      console.error("Error response:", errorData);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};





  return (
    <><form onSubmit={handleSubmit} className="space-y-6">
      <Card>
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

      <div className="flex justify-end">
        <Button type="submit" className="btn-primary" >{loading ? "Generating..." : "Generate Questions"}</Button>
      </div>
      {loading && (
          <div className="w-full mb-4">
            <Progress value={progress} />
          </div>
        )}
    </form></>
    
  );
}
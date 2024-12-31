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
      paper1: {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: [
          "Algebra",
          "Complex Numbers",
          "Sequences and Series",
          "Functions",
          "Calculus",
          "Financial Maths"
        ]
      },
      paper2: {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: [
          "Geometry",
          "Trigonometry",
          "Coordinate Geometry",
          "Probability",
          "Statistics"
        ]
      }
    },
    difficulty: ["Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level"]
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
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedPaper, setSelectedPaper] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [questions, setQuestions] = useState<Array<{ question: string; options: string[] }>>([]);
  const [loading, setLoading] = useState(false);


  const router = useRouter();

 // Function to handle slider change
 const handleSliderChange = (value: number[]) => {
  setQuestionCount(value[0]);

  // Initialize or adjust questions array based on new count
  const newQuestions = Array(value[0]).fill({
    question: "",
    options: ["", "", "", ""]
  });
  setQuestions(newQuestions);
};

//submit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // Prepare the data to send to the API
  const requestData = {
    subject: selectedSubject,
    difficulty: selectedDifficulty,
    topic: selectedTopic,
    level: selectedLevel,
    paper: selectedPaper,
    questionCount: questionCount,
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
      console.log("Data received:", data); // Log the JSON data

      if (data.questions && Array.isArray(data.questions)) {
        // Pass data to the generated page using query parameters
        router.push(
          `/quiz/generated?questions=${encodeURIComponent(JSON.stringify(data))}`
        );
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
                <Select onValueChange={setSelectedSubject}>
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

      

              {selectedSubject && (
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
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
              )}


              {selectedSubject && (
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
              )}

              {selectedSubject && (
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
              )}

              {selectedPaper && (
                <div className="space-y-2">
                  <Label>Section</Label>
                  <Select onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
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
              )}

              {selectedSection && (
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
              )}
            </div>
            <div className="space-y-6">

              <Label className="font-medium">Number of Questions</Label>
              <div className="px-3">
                <Slider
                  defaultValue={[5]}
                  max={10}
                  min={1}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="my-4" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1</span>
                  <span>{questionCount} questions</span>
                  <span>10</span>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="btn-primary" >{loading ? "Generating..." : "Generate Questions"}</Button>
      </div>
    </form></>
    
  );
}
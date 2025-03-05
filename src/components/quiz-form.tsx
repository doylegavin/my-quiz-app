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




const ExamStructureHL: SubjectStructure = {
  mathematics: {
    papers: {
      Both: {
        name: "Both",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Algebra": [],
          "Complex Numbers": [],
          "Sequences and Series": [],
          "Functions": [],
          "Differential Calculus": [],
          "Integral Calculus": [],
          "Financial Maths": [],
          "Proof by Induction": [],
          "Geometry": [],
          "Trigonometry": [],
          "Coordinate Geometry The Line": [],
          "Coordinate Geometry The Circle": [],
          "Probability": [],
          "Statistics": [],
          "Constructions": [],
        },
      },
      paper1: {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Algebra": [
            "Expressions, Notation & Substitution",
            "Factorising",
            "Expanding & Re-Grouping Expressions",
            "Algebraic Fractions",
            "Laws of Indices & Surds",
            "Logarithms & Exponential Functions",
            "Equations",
            "Inequalities",
            "Absolute Value (Modulus)",
            "Functions & Graphing",
            "Polynomials & The Factor Theorem",
            "Solving Higher-Order Equations",
            "Algebraic Manipulation",
            "Problem Solving Using Algebra",
          ],
          "Complex Numbers": [
            "Introduction to Complex Numbers",
            "Argand Diagram",
            "Addition & Subtraction of Complex Numbers",
            "Multiplication & Division of Complex Numbers",
            "Conjugates & Modulus",
            "Polar Form",
            "De Moivre's Theorem",
          ],
          "Sequences and Series": [
            "Arithmetic Sequences",
            "Arithmetic Series",
            "Geometric Sequences",
            "Geometric Series",
            "Summation Notation",
            "Limits of Sequences",
            "Infinite Series",
          ],
          "Functions": [
            "Linear Functions",
            "Quadratic Functions",
            "Cubic Functions",
            "Exponential Functions",
            "Logarithmic Functions",
            "Transformations of Functions",
            "Graphing Functions",
          ],
          "Differential Calculus": [
            "Limits and Continuity",
            "First Derivatives",
            "Second Derivatives",
            "Maxima and Minima",
            "Slopes of Tangents",
            "Differentiation from First Principles",
            "Applications of Differentiation",
          ],
          "Integral Calculus": [
            "Integration and Indefinite Integrals",
            "Definite Integrals and Areas",
            "Trapezoidal Rule",
          ],
          "Financial Maths": [
            "Compound Interest",
            "Depreciation",
            "Loans and Investments",
            "Annuities",
            "Present Value",
            "Future Value",
          ],
          "Proof by Induction": [
            "Introduction to Induction",
            "Summation Proofs",
            "Divisibility Proofs",
            "Inequality Proofs",
          ],
        },
      },
      paper2: {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Geometry": [
            "Basic Geometric Concepts",
            "Angles & Lines",
            "Triangles & Congruence",
            "Quadrilaterals",
            "Circles & Theorems",
            "Proofs in Geometry",
          ],
          "Trigonometry": [
            "Right-Angled Triangles & Pythagoras",
            "Trigonometric Ratios",
            "Special Angles (30°, 45°, 60°)",
            "The Unit Circle",
            "Graphing Trigonometric Functions",
            "Solving Trigonometric Equations",
            "The Sine Rule",
            "The Cosine Rule",
            "Area of a Triangle",
            "3D Trigonometry Problems",
          ],
          "Coordinate Geometry The Line": [
            "Distance Between Two Points",
            "Midpoint of a Line Segment",
            "Slope of a Line",
            "Equation of a Line",
            "Intersection of Lines",
            "Further Equations",
          ],
          "Coordinate Geometry The Circle": [
            "Equations of Circles",
            "Lines and Circles",
            "Points Inside, Outside, or On a Circle",
            "Tangents and Chords",
          ],
          "Probability": [
            "Fundamental Principle of Counting",
            "Permutations & Combinations",
            "Probability Theory",
            "Independent & Dependent Events",
            "Tree Diagrams",
            "Expected Value",
            "The Binomial Distribution",
            "The Normal Distribution",
          ],
          "Statistics": [
            "Measures of Central Tendency",
            "Measures of Variation",
            "Probability Distributions",
            "The Normal Distribution",
            "Confidence Intervals",
            "Hypothesis Testing",
            "Linear Regression",
          ],
          "Constructions": [
            "Basic Constructions",
            "Higher-Level Constructions",
            "Loci",
          ],
        },
      },
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"],
  },
};


const ExamStructureOL: SubjectStructure = {
  mathematics: {
    papers: {
      Both: {
        name: "Both",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Algebra": [],
          "Complex Numbers": [],
          "Sequences and Series": [],
          "Functions": [],
          "Differential Calculus": [],
          "Financial Maths": [],
          "Geometry": [],
          "Trigonometry": [],
          "Coordinate Geometry The Line": [],
          "Coordinate Geometry The Circle": [],
          "Probability": [],
          "Statistics": [],
          "Constructions": [],
        },
      },
      paper1: {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Algebra": [
            "Expressions, Notation & Substitution",
            "Factorising",
            "Expanding & Re-Grouping Expressions",
            "Algebraic Fractions",
            "Equations",
            "Inequalities",
            "Absolute Value (Modulus)",
            "Algebraic Manipulation",
            "Problem Solving Using Algebra",
          ],
          "Complex Numbers": [
            "Introduction to Complex Numbers",
            "Addition & Subtraction",
            "Multiplication & Division",
            "Conjugates & Modulus",
            "Argand Diagram",
          ],
          "Sequences and Series": [
            "Arithmetic Sequences",
            "Arithmetic Series",
            "Geometric Sequences",
            "Geometric Series",
          ],
          "Functions": [
            "Linear Functions",
            "Quadratic Functions",
            "Graphing Functions",
          ],
          "Differential Calculus": [
            "First Derivatives",
            "Second Derivatives",
            "Slopes of Tangents",
            "Maxima and Minima",
          ],
          "Financial Maths": [
            "Compound Interest",
            "Depreciation",
            "Loans and Investments",
          ],
        },
      },
      paper2: {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Geometry": [
            "Basic Geometric Concepts",
            "Angles & Lines",
            "Triangles & Congruence",
            "Quadrilaterals",
            "Circles & Theorems",
          ],
          "Trigonometry": [
            "Right-Angled Triangles & Pythagoras",
            "Trigonometric Ratios",
            "Special Angles (30°, 45°, 60°)",
            "The Sine Rule",
            "The Cosine Rule",
            "Area of a Triangle",
          ],
          "Coordinate Geometry The Line": [
            "Distance Between Two Points",
            "Midpoint of a Line Segment",
            "Slope of a Line",
            "Equation of a Line",
            "Intersection of Lines",
          ],
          "Coordinate Geometry The Circle": [
            "Equations of Circles",
            "Lines and Circles",
            "Points Inside, Outside, or On a Circle",
            "Tangents and Chords",
          ],
          "Probability": [
            "Fundamental Principle of Counting",
            "Permutations & Combinations",
            "Probability Theory",
            "Tree Diagrams",
            "Expected Value",
          ],
          "Statistics": [
            "Measures of Central Tendency",
            "Measures of Variation",
            "Probability Distributions",
            "The Normal Distribution",
          ],
          "Constructions": [
            "Basic Constructions",
            "Higher-Level Constructions",
          ],
        },
      },
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"],
  },
};



const ExamStructureFL: SubjectStructure = {
  mathematics: {
    papers: {
      Both: {
        name: "Both",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Number Theory": [],
          "Algebra": [],
          "Functions": [],
          "Geometry": [],
          "Trigonometry": [],
          "Statistics": [],
          "Probability": [],
        },
      },
    },
    difficulty: ["Random", "Easy", "Medium"],
    levels: ["Foundation Level"],
  },
};


/* 
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
};
 */
  
export function QuizForm() {
  const [selectedSubject, setSelectedSubject] = useState<string>("mathematics");
  const [selectedPaper, setSelectedPaper] = useState<string>("Both");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Random");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("Short Questions");
  const [selectedTopic, setSelectedTopic] = useState<string>("Random");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [availableSubtopics, setAvailableSubtopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Define all available levels separately - this breaks the circular dependency
  const allLevels = ["Higher Level", "Ordinary Level", "Foundation Level"];

  const getExamStructure = () => {
    if (selectedLevel === "Higher Level") return ExamStructureHL;
    if (selectedLevel === "Ordinary Level") return ExamStructureOL;
    return ExamStructureFL;
  };
  
  // Get the exam structure AFTER a level has been selected
  const examStructure = selectedLevel ? getExamStructure() : ExamStructureHL; // Default to HL for initial UI

  // Update available subtopics when selectedTopic changes
  useEffect(() => {
    if (selectedLevel !== "Foundation Level" && selectedTopic !== "Random") {
      const currentExamStructure = getExamStructure();
      
      // Type assert that selectedPaper is a key of the papers object
      const paperKey = selectedPaper as keyof typeof currentExamStructure[typeof selectedSubject]['papers'];
      const selectedPaperData = currentExamStructure[selectedSubject].papers[paperKey];
      
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

      setSelectedSubtopic(""); // Reset subtopic when topic changes
    } else {
      setAvailableSubtopics([]);
      setSelectedSubtopic("");
    }
  }, [selectedTopic, selectedPaper, selectedLevel, selectedSubject]);

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
      topics: selectedTopic, // Changed from 'topic' to 'topics'
      level: selectedLevel,
      paper: selectedPaper,
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
      
      console.log("Request data:", requestData); // Added for debugging
      console.log("Response:", response);
      
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
                          {Object.keys(examStructure[selectedSubject].papers[selectedPaper].topics).map(
                            (topics) => (
                              <SelectItem key={topics} value={topics}>
                                {topics}
                              </SelectItem>
                            )
                          )}
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
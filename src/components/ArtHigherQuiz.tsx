import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface Question {
  id: number;
  text: string;
  section: string;
  topic: string;
  options: string[];
  correctAnswer: number;
}

const artQuestions: Question[] = [
  {
    id: 1,
    text: "Which of the following is NOT considered one of the formal elements of art?",
    section: "Art History and Appreciation",
    topic: "General Art Concepts",
    options: [
      "Line",
      "Color",
      "Theme",
      "Texture"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "The Book of Kells is an example of which art form?",
    section: "Art History and Appreciation",
    topic: "Irish Art",
    options: [
      "Celtic Metalwork",
      "Illuminated Manuscript",
      "Stone Carving",
      "Fresco Painting"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "Which art movement was characterized by its focus on light, color, and the depiction of modern life?",
    section: "Art History and Appreciation",
    topic: "European Art",
    options: [
      "Impressionism",
      "Cubism",
      "Baroque",
      "Surrealism"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    text: "When developing a mixed media artwork for coursework, which of the following is most important?",
    section: "Practical Coursework",
    topic: "Imaginative Composition",
    options: [
      "Using as many materials as possible",
      "Only using traditional media",
      "Ensuring the media choices enhance the concept",
      "Focusing only on technical perfection"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    text: "In life drawing, 'gesture drawing' refers to:",
    section: "Practical Examination",
    topic: "Life Drawing",
    options: [
      "Drawing only the hands of the model",
      "Quick sketches capturing the essence of movement",
      "Highly detailed anatomical studies",
      "Drawing with only the non-dominant hand"
    ],
    correctAnswer: 1
  }
];

const ArtHigherQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = artQuestions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    // Reset for next question
    setSelectedAnswer(null);
    setShowResult(false);
    
    // Move to next question or end quiz
    if (currentQuestionIndex < artQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Art Higher Level Quiz</CardTitle>
        <CardDescription>
          Test your knowledge of Higher Level Art concepts
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!completed ? (
          <>
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {artQuestions.length} • {currentQuestion.section} • {currentQuestion.topic}
              </span>
              <h3 className="text-xl font-medium mt-2 mb-4">{currentQuestion.text}</h3>
              
              <RadioGroup className="space-y-3" value={selectedAnswer?.toString()}>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      onClick={() => handleAnswerSelect(index)}
                      className={showResult ? 
                        index === currentQuestion.correctAnswer ? 
                          "text-green-600 border-green-600" : 
                          selectedAnswer === index ? 
                            "text-red-600 border-red-600" : "" 
                        : ""}
                    />
                    <Label 
                      htmlFor={`option-${index}`}
                      className={showResult ? 
                        index === currentQuestion.correctAnswer ? 
                          "text-green-600" : 
                          selectedAnswer === index ? 
                            "text-red-600" : "" 
                        : ""}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              {showResult && (
                <div className="mt-4 p-4 rounded-md bg-slate-50">
                  <p className={selectedAnswer === currentQuestion.correctAnswer ? "text-green-600" : "text-red-600"}>
                    {selectedAnswer === currentQuestion.correctAnswer 
                      ? "Correct! Well done." 
                      : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
            <p className="text-xl mb-6">Your score: {score} out of {artQuestions.length}</p>
            <p className="mb-6">
              {score === artQuestions.length 
                ? "Perfect score! Amazing job!" 
                : score >= artQuestions.length / 2 
                  ? "Good work! Keep studying to improve further." 
                  : "Keep practicing! Review the Art curriculum and try again."}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {!completed ? (
          <>
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0 || showResult}
            >
              Previous
            </Button>
            
            {!showResult ? (
              <Button 
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
              >
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < artQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            )}
          </>
        ) : (
          <Button onClick={resetQuiz} className="mx-auto">
            Restart Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArtHigherQuiz; 
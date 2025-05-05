"use client";

import { VARKQuestion } from "@/data/vark-questions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: VARKQuestion;
  onAnswer: (questionId: number, answerType: string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  currentIndex: number;
  totalQuestions: number;
  previousAnswers?: Record<number, string>;
}

// Animation variants for card transitions
const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { 
      duration: 0.2 
    }
  }
};

export default function QuestionCard({
  question,
  onAnswer,
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
  previousAnswers = {}
}: QuestionCardProps) {
  // Initialize selectedOption from previousAnswers if available
  const [selectedOption, setSelectedOption] = useState<string | null>(
    previousAnswers[question.id] || null
  );
  const [hasVibrated, setHasVibrated] = useState(false);
  // Store shuffled options in state so they don't change on re-render
  const [shuffledOptions, setShuffledOptions] = useState(() => 
    [...question.options].sort(() => Math.random() - 0.5)
  );

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    
    // Trigger haptic feedback if available
    if (navigator.vibrate && !hasVibrated) {
      navigator.vibrate(50);
      setHasVibrated(true);
    }
  };

  // Reset hasVibrated when question changes and re-shuffle options
  useEffect(() => {
    setHasVibrated(false);
    // Update selectedOption if we have a previous answer for this question
    if (previousAnswers && previousAnswers[question.id]) {
      setSelectedOption(previousAnswers[question.id]);
    } else {
      setSelectedOption(null);
    }
    // Shuffle options when question changes, not on every render
    setShuffledOptions([...question.options].sort(() => Math.random() - 0.5));
  }, [question.id, previousAnswers, question.options]);

  const handleNext = () => {
    if (selectedOption) {
      onAnswer(question.id, selectedOption);
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      // If there's a selection, save it before going back
      if (selectedOption) {
        onAnswer(question.id, selectedOption);
      }
      onPrevious();
    }
  };

  return (
    <motion.div
      key={question.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">
            Question {currentIndex + 1} of {totalQuestions}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            
            <RadioGroup 
              value={selectedOption || ""} 
              onValueChange={handleOptionChange}
              className="space-y-3"
            >
              {shuffledOptions.map((option) => (
                <motion.div 
                  key={option.type}
                  className="flex items-start space-x-2 p-3 rounded-md transition-colors"
                  whileHover={{ 
                    backgroundColor: "rgba(0,0,0,0.03)", 
                    scale: 1.01,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RadioGroupItem value={option.type} id={`option-${question.id}-${option.type}`} />
                  <Label 
                    htmlFor={`option-${question.id}-${option.type}`}
                    className="text-base cursor-pointer font-normal flex-1"
                  >
                    {option.text}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Previous Button */}
          {currentIndex > 0 && onPrevious && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handlePrevious} 
                variant="outline"
                className="px-4 flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
            </motion.div>
          )}
          
          {/* Spacer when on first question */}
          {currentIndex === 0 && <div></div>}
          
          {/* Next/Finish Button */}
          <motion.div
            whileHover={{ scale: selectedOption ? 1.05 : 1 }}
            whileTap={{ scale: selectedOption ? 0.95 : 1 }}
          >
            <Button 
              onClick={handleNext} 
              disabled={!selectedOption}
              className={`px-6 transition-all duration-300 flex items-center gap-1 ${
                selectedOption 
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg" 
                  : "bg-gray-400"
              }`}
            >
              {currentIndex < totalQuestions - 1 ? (
                <>
                  Next
                  <ChevronRight size={16} />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { varkQuestions, interpretResults } from "@/data/vark-questions";
import QuestionCard from "@/components/vark/QuestionCard";
import ResultsCard from "@/components/vark/ResultsCard";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";

export default function VARKAssessmentPage() {
  // States to track assessment progress and results
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-16 = questions, 17 = results
  const [answers, setAnswers] = useState<Record<string, number>>({
    V: 0, A: 0, R: 0, K: 0
  });
  // Track individual question answers by question ID
  const [questionAnswers, setQuestionAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const { width, height } = useWindowSize();

  // Direction for animation (1 for forward, -1 for backward)
  const [direction, setDirection] = useState(1);
  
  // Get questions from varkQuestions data
  const [questions, setQuestions] = useState(varkQuestions);
  
  // Calculate progress percentage
  const progress = currentStep === 0 ? 0 : ((currentStep - 1) / questions.length) * 100;
  
  // Load streak from localStorage on component mount
  useEffect(() => {
    const savedStreak = localStorage.getItem('varkStreak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
    
    // Check if last completion was more than 24 hours ago
    const lastCompletion = localStorage.getItem('varkLastCompletion');
    if (lastCompletion) {
      const lastCompletionDate = new Date(lastCompletion);
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      if (lastCompletionDate < oneDayAgo) {
        // It's been more than a day, they can increase their streak
        localStorage.removeItem('varkCompletedToday');
      }
    }
  }, []);
  
  // Handle answer submission
  const handleAnswer = (questionId: number, answerType: string) => {
    // Store the answer type by question ID
    setQuestionAnswers(prev => ({
      ...prev,
      [questionId]: answerType
    }));
    
    // Recalculate the total counts for each learning style
    // This ensures accurate counts when users change previous answers
    const updatedAnswers = { ...questionAnswers, [questionId]: answerType };
    const counts = Object.values(updatedAnswers).reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, { V: 0, A: 0, R: 0, K: 0 } as Record<string, number>);
    
    setAnswers(counts);
  };
  
  // Move to next question or results
  const handleNext = () => {
    setDirection(1);
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
      const result = interpretResults(answers);
      setResults(result);
      setCurrentStep(questions.length + 1);
      setShowConfetti(true);
      
      // Update streak if not already completed today
      const completedToday = localStorage.getItem('varkCompletedToday');
      if (!completedToday) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('varkStreak', newStreak.toString());
        localStorage.setItem('varkCompletedToday', 'true');
        localStorage.setItem('varkLastCompletion', new Date().toISOString());
      }
      
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  };

  // Go to previous question
  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Reset assessment
  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({ V: 0, A: 0, R: 0, K: 0 });
    setQuestionAnswers({});
    setResults(null);
    setShowConfetti(false);
    setDirection(1);
  };

  // Custom variants for direction-based animations
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Confetti effect on completion */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">VARK Learning Style Assessment</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover how you learn best by identifying your preferred learning style: 
          Visual, Auditory, Reading/Writing, or Kinesthetic.
        </p>
        
        {/* Show streak badge if streak > 1 */}
        {streak > 1 && (
          <motion.div 
            className="mt-2 inline-flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="mr-1">🔥</span> {streak} day streak!
          </motion.div>
        )}
      </div>
      
      {/* Progress bar (only show during questions) */}
      {currentStep > 0 && currentStep <= questions.length && (
        <div className="w-full mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right mt-1 text-gray-500">
            Question {currentStep} of {questions.length}
          </p>
        </div>
      )}
      
      {/* Content based on current step */}
      <div className="w-full">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Introduction screen */}
          {currentStep === 0 && (
            <motion.div
              key="intro"
              custom={direction}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVariants}
            >
              <Card className="w-full shadow-lg">
                <CardHeader>
                  <CardTitle>Discover Your Learning Style</CardTitle>
                  <CardDescription>
                    Answer a few questions to find out how you learn best.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">What is VARK?</h3>
                    <p>
                      VARK stands for Visual, Auditory, Reading/Writing, and Kinesthetic. 
                      These represent different ways that people prefer to learn new information:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h4 className="font-semibold mb-1 text-blue-700">Visual (V)</h4>
                        <p className="text-sm">
                          Prefer using images, pictures, colors, and maps to organize information and communicate with others.
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-md">
                        <h4 className="font-semibold mb-1 text-green-700">Auditory (A)</h4>
                        <p className="text-sm">
                          Prefer to hear information rather than reading it or seeing it displayed visually.
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-md">
                        <h4 className="font-semibold mb-1 text-purple-700">Reading/Writing (R)</h4>
                        <p className="text-sm">
                          Prefer information displayed as words, emphasizing text-based input and output.
                        </p>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-md">
                        <h4 className="font-semibold mb-1 text-orange-700">Kinesthetic (K)</h4>
                        <p className="text-sm">
                          Prefer to learn through experience, practice, and using physical abilities.
                        </p>
                      </div>
                    </div>
                    
                    <p className="mt-4">
                      This assessment contains {questions.length} questions and takes about 5 minutes to complete.
                      Your results will help you understand your learning preferences and provide strategies to improve your study effectiveness.
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="w-full max-w-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3"
                      onClick={() => setCurrentStep(1)}
                    >
                      Start Assessment
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          )}
          
          {/* Question screen */}
          {currentStep > 0 && currentStep <= questions.length && (
            <motion.div
              key={`question-${currentStep}`}
              custom={direction}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVariants}
            >
              <QuestionCard
                question={questions[currentStep - 1]}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentIndex={currentStep - 1}
                totalQuestions={questions.length}
                previousAnswers={questionAnswers}
              />
            </motion.div>
          )}
          
          {/* Results screen */}
          {currentStep > questions.length && results && (
            <motion.div
              key="results"
              custom={direction}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVariants}
            >
              <ResultsCard results={results} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 
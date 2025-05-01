"use client"

import React, { useState } from "react"
import { useFormattedQuizStore, FormattedQuizQuestion } from "@/stores/useFormattedQuizStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Printer } from "lucide-react"
import 'katex/dist/katex.min.css'
import { renderLatexInElement } from "@/lib/utils/latexRenderer"

export default function FormattedQuiz() {
  const { 
    quizId, 
    quizTitle, 
    quizDescription, 
    quizSubject, 
    quizLevel, 
    quizDifficulty, 
    quizQuestions 
  } = useFormattedQuizStore()
  
  const [showSolutions, setShowSolutions] = useState(false)
  
  // If no quiz is loaded
  if (!quizId) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Quiz Loaded</CardTitle>
          <CardDescription>Generate a new quiz or load an existing one to view it here.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Function to handle printing the quiz
  const handlePrint = () => {
    window.print()
  }
  
  // Function to render a question with latex
  const renderQuestionElement = (content: string) => {
    const ref = (node: HTMLDivElement | null) => {
      if (node) {
        renderLatexInElement(node);
      }
    };
    return <div ref={ref} dangerouslySetInnerHTML={{ __html: content }} />
  }

  return (
    <div className="space-y-4 print:space-y-2">
      {/* Quiz Header - only visible in print if solutions are shown */}
      <Card className={!showSolutions ? "print:hidden" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{quizTitle}</CardTitle>
              <CardDescription>{quizDescription}</CardDescription>
            </div>
            <div className="print:hidden flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSolutions(!showSolutions)}
              >
                {showSolutions ? <><EyeOff className="mr-2 h-4 w-4" /> Hide Solutions</> : <><Eye className="mr-2 h-4 w-4" /> Show Solutions</>}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrint}
              >
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">{quizSubject}</Badge>
            <Badge variant="outline">{quizLevel}</Badge>
            <Badge variant="outline">Difficulty: {quizDifficulty}</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Questions Only View (for printing without solutions) */}
      {!showSolutions && (
        <Card className="print:shadow-none print:border-none">
          <CardHeader className="print:pb-2">
            <CardTitle className="print:text-xl">{quizTitle}</CardTitle>
            <CardDescription className="print:text-sm">{quizDescription}</CardDescription>
            <div className="flex flex-wrap gap-2 mt-2 print:text-xs">
              <Badge variant="outline">{quizSubject}</Badge>
              <Badge variant="outline">{quizLevel}</Badge>
              <Badge variant="outline">Difficulty: {quizDifficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 print:space-y-4">
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="space-y-2">
                <div className="font-medium">
                  Question {index + 1}
                  {question.topic && <span className="text-sm text-muted-foreground ml-2">({question.topic})</span>}
                </div>
                {renderQuestionElement(question.question)}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Questions and Solutions View */}
      {showSolutions && (
        <ScrollArea className="h-[calc(100vh-200px)] print:h-auto">
          <div className="space-y-6 print:space-y-4">
            {quizQuestions.map((question, index) => (
              <Card key={question.id} className="print:shadow-none print:border-none print:mb-4">
                <CardHeader className="print:py-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg print:text-base">Question {index + 1}</CardTitle>
                    {question.topic && (
                      <Badge variant="outline" className="print:text-xs">{question.topic}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 print:space-y-2">
                  {renderQuestionElement(question.question)}
                  <Separator className="my-2" />
                  <div>
                    <div className="font-medium mb-2">Solution:</div>
                    {renderQuestionElement(question.solution)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
} 
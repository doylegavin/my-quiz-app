"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface FormattedQuizQuestion {
  id: string
  question: string
  solution: string
  subject: string
  level: string
  division?: string
  section?: string
  topic?: string
  subtopic?: string
}

interface QuizData {
  id: string
  title: string
  description: string
  subject: string
  level: string
  difficulty: string
  division?: string
  section?: string
  topic?: string
  subtopic?: string
  questions: FormattedQuizQuestion[]
  solutions?: any
}

interface FormattedQuizState {
  quizId: string | null
  quizTitle: string | null
  quizDescription: string | null
  quizSubject: string | null
  quizLevel: string | null
  quizDifficulty: string | null
  quizQuestions: FormattedQuizQuestion[]
  isLoading: boolean
  error: string | null
}

interface FormattedQuizActions {
  setFormattedQuiz: (quizData: QuizData) => void
  clearFormattedQuiz: () => void
  saveQuizToDatabase: (userId?: string) => Promise<string>
  fetchQuizById: (quizId: string) => Promise<void>
  setError: (error: string | null) => void
}

type FormattedQuizStore = FormattedQuizState & FormattedQuizActions

export const useFormattedQuizStore = create<FormattedQuizStore>()(
  persist(
    (set, get) => ({
      // Initial state
      quizId: null,
      quizTitle: null,
      quizDescription: null,
      quizSubject: null,
      quizLevel: null,
      quizDifficulty: null,
      quizQuestions: [],
      isLoading: false,
      error: null,
      
      // Actions
      setFormattedQuiz: (quizData) => {
        set({
          quizId: quizData.id,
          quizTitle: quizData.title || "Untitled Quiz",
          quizDescription: quizData.description || "",
          quizSubject: quizData.subject,
          quizLevel: quizData.level,
          quizDifficulty: quizData.difficulty,
          quizQuestions: quizData.questions,
          error: null,
        })
      },
      
      clearFormattedQuiz: () => {
        set({
          quizId: null,
          quizTitle: null,
          quizDescription: null,
          quizSubject: null,
          quizLevel: null,
          quizDifficulty: null,
          quizQuestions: [],
          error: null,
        })
      },

      setError: (error) => {
        set({ error })
      },
      
      saveQuizToDatabase: async (userId) => {
        const state = get();
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/quizzes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: state.quizTitle || "Untitled Quiz",
              description: state.quizDescription || "",
              subject: state.quizSubject,
              level: state.quizLevel,
              difficulty: state.quizDifficulty || "Random",
              topic: state.quizQuestions[0]?.topic || null,
              section: state.quizQuestions[0]?.section || null,
              subtopic: state.quizQuestions[0]?.subtopic || null,
              userId: userId || null,
              isPublic: true, // Default to public
              questions: state.quizQuestions.map(q => ({
                question: q.question,
                solution: q.solution,
                metadata: {
                  topic: q.topic,
                  section: q.section,
                  subtopic: q.subtopic
                }
              })),
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to save quiz');
          }
          
          const data = await response.json();
          set({ quizId: data.id, isLoading: false });
          return data.id;
        } catch (error) {
          console.error('Error saving quiz:', error);
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Unknown error saving quiz' 
          });
          throw error;
        }
      },
      
      fetchQuizById: async (quizId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/quizzes/${quizId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch quiz');
          }
          
          const data = await response.json();
          
          set({
            quizId: data.id,
            quizTitle: data.title,
            quizDescription: data.description,
            quizSubject: data.subject,
            quizLevel: data.level,
            quizDifficulty: data.difficulty,
            quizQuestions: data.questions.map((q: any) => ({
              id: q.id,
              question: q.question,
              solution: q.solution,
              subject: data.subject,
              level: data.level,
              topic: data.topic,
              section: data.section,
              subtopic: data.subtopic,
            })),
            isLoading: false,
          });
        } catch (error) {
          console.error('Error fetching quiz:', error);
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Unknown error fetching quiz' 
          });
        }
      },
    }),
    {
      name: "formatted-quiz-storage",
    }
  )
) 
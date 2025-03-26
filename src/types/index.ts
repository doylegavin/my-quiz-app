/**
 * Common TypeScript types used across the application
 */

// User related types
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'STUDENT' | 'TEACHER';
}

export interface ExtendedSession {
  user: User;
  expires: string;
}

// Quiz related types
export interface QuizQuestion {
  id: string;
  quizId?: string;
  question: string;
  options: string[];
  answer: string;
  userAnswer?: string | null;
  isCorrect?: boolean | null;
  gameId?: string;
  questionType: 'multiple-choice' | 'true-false' | 'short-answer';
  explanation?: string;
}

export interface Quiz {
  id: string;
  userId: string;
  topic: string;
  title?: string;
  description?: string;
  score?: number;
  createdAt: Date;
  questions: QuizQuestion[];
  user?: User;
  isPublic?: boolean;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  userId: string;
  answers: {
    questionId: string;
    answer: string;
  }[];
  score: number;
  completedAt: string;
}

export interface QuizPreview {
  id: string;
  title?: string;
  topic: string;
  description?: string;
  userId: string;
  createdAt: Date;
  questionCount: number;
  isPublic?: boolean;
  user?: User;
}

// Component props types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Form related types
export interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
} 
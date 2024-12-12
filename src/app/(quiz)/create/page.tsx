// app/(quiz)/create/page.tsx
import { QuizForm } from "@/components/quiz-form";

export default function CreateQuizPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Quiz</h1>
      <QuizForm />
    </div>
  );
}
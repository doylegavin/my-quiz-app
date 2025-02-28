// app/(quiz)/create/page.tsx
import { QuizForm } from "@/components/quiz-form";

export default function CreateQuizPage() {
  return (
    <div className="max-w-2xl mx-auto pt-8 pb-16">
      <h1 className="text-3xl font-bold mb-6 pl-16">Create New Quiz</h1>
      <QuizForm />
    </div>
  );
}
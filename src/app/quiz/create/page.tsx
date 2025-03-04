// app/(quiz)/create/page.tsx
import { QuizForm } from "@/components/quiz-form";

export default function CreateQuizPage() {
  return (
    <div className="max-w-2xl mx-auto pt-8 pb-16 pl-9">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Create New Quiz</h1>
      <QuizForm />
    </div>
  );
}
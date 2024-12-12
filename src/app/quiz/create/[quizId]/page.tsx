// app/(quiz)/[quizId]/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizPageProps {
  params: {
    quizId: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Quiz Title</h1>
          <Progress value={30} className="w-32" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Question 3 of 10</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">What is the capital of France?</p>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">Paris</Button>
              <Button className="w-full justify-start" variant="outline">London</Button>
              <Button className="w-full justify-start" variant="outline">Berlin</Button>
              <Button className="w-full justify-start" variant="outline">Madrid</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  );
}
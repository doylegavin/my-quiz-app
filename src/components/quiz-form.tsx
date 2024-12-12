// components/quiz-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export function QuizForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Quiz Title</label>
        <Input placeholder="Enter quiz title..." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Subject</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea placeholder="Enter quiz description..." />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Questions</h3>
              <Button type="button" variant="outline" size="sm">
                Add Question
              </Button>
            </div>

            {/* Question fields would be dynamically added here */}
            <div className="space-y-4 border rounded-lg p-4">
              <Input placeholder="Enter question..." />
              <div className="space-y-2">
                <Input placeholder="Answer option 1" />
                <Input placeholder="Answer option 2" />
                <Input placeholder="Answer option 3" />
                <Input placeholder="Answer option 4" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                  <SelectItem value="4">Option 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Create Quiz</Button>
      </div>
    </form>
  );
}
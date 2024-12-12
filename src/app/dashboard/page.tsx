// app/(dashboard)/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={65} className="w-full" />
            <p className="mt-2 text-sm text-gray-600">65% of daily goal completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-600">Quizzes in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7 days</p>
            <p className="text-sm text-gray-600">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {/* Add map function for real data */}
              <li className="flex justify-between items-center">
                <span>Biology Chapter 5</span>
                <Link href="/quiz/123">
                  <Button variant="outline" size="sm">Continue</Button>
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Review Mathematics</span>
                <Button variant="outline" size="sm">Start</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

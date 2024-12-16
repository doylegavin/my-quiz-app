// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Master Your Studies
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Personalized learning experience with AI-powered quizzes and adaptive study tools.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/quiz/create">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Adaptive Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                AI-powered system that adapts to your learning style and pace
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor your progress with detailed analytics and insights
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Accessibility First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Designed for all learners with customizable display options
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Study Methods Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Study Your Way
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Interactive Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Multiple choice questions</li>
                <li>✓ Fill in the blanks</li>
                <li>✓ True/False questions</li>
                <li>✓ Match the pairs</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Study Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Flashcards</li>
                <li>✓ Mind maps</li>
                <li>✓ Summary notes</li>
                <li>✓ Practice tests</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of students improving their grades with our platform.
        </p>
        <Link href="/signup">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Create Free Account
          </Button>
        </Link>
      </section>
    </div>
  );
}
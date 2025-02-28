// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pl-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10 text-center">
      <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center drop-shadow-lg">
      Examinaite
        </h1>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          The Future of Exam Prep
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          AI-powered tools to generate real exam-style questions, interactive assessments, and dynamic learning materials for students and teachers.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/quiz/create">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Create Quiz
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Waitlist Signup Section */}
      <section className="container mx-auto px-4 py-16 text-center bg-gradient-to-b to-white rounded-lg ">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Be the First to Access Examinaite!
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
        Join our waitlist and get early access to AI-powered exam prep tools before anyone else.
      </p>
      <p className="text-gray-500 text-sm md:text-base mb-8">
        Limited spots available for beta testers! 🚀
      </p>
      <a
        href="https://forms.gle/LkDQbXotyPJQndzc6"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          Join the Waitlist 🚀
        </Button>
      </a>
    </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>AI-Generated Exam Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Generate exam-style questions that align with real curriculum standards, making revision more effective.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Dynamic Diagrams & Graphs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Integrated API support for visualizing problems with automatically generated graphs and diagrams.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Printable Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Convert generated quizzes into downloadable PDFs, making it easy for teachers to create structured assessments.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Study Methods Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Designed for Students & Teachers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Smart Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Personalized AI-powered quizzes</li>
                <li>✓ Step-by-step solutions with explanations</li>
                <li>✓ Instant feedback for better understanding</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Effortless Teacher Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Auto-generated worksheets & exams</li>
                <li>✓ Customizable assessments with export options</li>
                <li>✓ Time-saving AI assistance for lesson planning</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      
    </div>
  );
}

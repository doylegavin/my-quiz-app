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
          Study Smarter, Not Harder
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Get ready for your exams with fun, personalized quizzes and tools that make learning easier.
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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Real Exam Prep</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Questions that look just like what you’ll see in the real exams. Practice now, ace them later!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Smarter Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our app learns what you’re good at and what you need help with, so you can focus on what matters most.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>See Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Watch yourself improve with tools that show how much you’ve learned and what’s next.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Study Methods Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Learn Your Way
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Quizzes That Work for You</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Multiple-choice and fill-in-the-blanks</li>
                <li>✓ True or false questions</li>
                <li>✓ Match the pairs and more</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Tools to Help You Shine</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Flashcards for quick facts</li>
                <li>✓ Step-by-step guides for tough topics</li>
                <li>✓ Practice exams to test your knowledge</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join students across Ireland who are smashing their goals with this app!
        </p>
        <Link href="/signup">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Sign Up for Free
          </Button>
        </Link>
      </section>
    </div>
  );
}

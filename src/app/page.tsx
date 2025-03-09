// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Hourglass, Circle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pl-16 w-full max-w-[100vw] overflow-x-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10 text-center">
        <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center drop-shadow-lg">
          Examinaite
        </h1>
        <h1 className="text-lg md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🚀 Personalised Exam-Style Questions So You Can Ace the Leaving Cert
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Generate exam-style questions instantly, just like the real thing—saving students and teachers hours of prep time
        </p>
      </section>

      {/* Join Waitlist Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          📩 Join the Waitlist & Get Early Access!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Enter your email to be the first to try new features
        </p>
        <form 
          action="https://docs.google.com/forms/d/e/1FAIpQLScvS415wKF4WF0aeiGgh1UOs1GjxKn3xD3DRNCJR90IrQnyXQ/formResponse"
          method="POST"
          target="_blank"
          className="flex flex-col gap-4 md:flex-row justify-center items-center w-full max-w-md mx-auto"
        >
          <input
            type="email"
            name="entry.1569025193"
            placeholder="Enter your email..."
            required
            className="px-4 py-3 text-lg border rounded-lg w-full md:w-96"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            🚀 Join the Waitlist
          </button>
        </form>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">🔍 1. Select a Topic & Level</CardTitle>
            </CardHeader>
            <CardContent>Pick your subject, topic, and difficulty—tailored for Higher, Ordinary, or Foundation Level</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">📝 2. Generate Realistic Exam Questions</CardTitle>
            </CardHeader>
            <CardContent>AI creates Leaving Cert-style questions with detailed solutions & marking schemes in seconds</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">📄 3. Practice (Exporting coming soon!)</CardTitle>
            </CardHeader>
            <CardContent>Test yourself instantly</CardContent>
          </Card>
        </div>
        <Link href="/quiz/create">
          <Button size="lg" className="mt-6 bg-blue-600 hover:bg-blue-700">
            🎯 Generate Your First Question →
          </Button>
        </Link>
      </section>

      {/* Who is it for? */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Who Is It For?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">🧑‍🎓 Students</CardTitle>
            </CardHeader>
            <CardContent>Ace your exams with personalised questions & solutions</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">👩‍🏫 Teachers</CardTitle>
            </CardHeader>
            <CardContent>Create exam papers & quizzes in seconds</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold">📚 Tutors & Schools</CardTitle>
            </CardHeader>
            <CardContent>Automate assessments & focus on teaching</CardContent>
          </Card>
        </div>
      </section>

      {/* Embedded YouTube Video */}
      <section className="container mx-auto px-4 py-16 text-center">
  <h2 className="text-3xl font-bold mb-6">See Examinaite in Action</h2>
  
  {/* Video container with aspect ratio */}
  <div className="w-full max-w-3xl mx-auto aspect-video relative">
    <iframe
      src="https://www.youtube.com/embed/8xGoWuRCyws"
      title="Examinaite Demo Video"
      frameBorder="0"
      allowFullScreen
      className="rounded-lg shadow-lg absolute inset-0 w-full h-full"
    ></iframe>
  </div>
  
  <div className="flex gap-4 justify-center pt-16">
    <Link href="/quiz/create">
      <Button size="lg" className="bg-purple-600 hover:bg-purple-700 py-3 md:py-4">
        🟢 <strong>TRY FOR FREE</strong>
      </Button>
    </Link>
  </div>
</section>

      {/* Why Examinaite? */}
      <section className="container mx-auto px-4 pb-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Examinaite?</h2>
        <ul className="text-lg text-gray-600 max-w-2xl mx-auto space-y-3">
          <li>✅ Saves Time – No more hours spent crafting exam questions</li>
          <li>✅ Real Exam Format – Every question follows official Leaving Cert standards</li>
          <li>✅ Boosts Learning – Step-by-step solutions help students understand, not just memorize</li>
          <li>✅ Perfect for Teachers & Students – Use for classroom prep, revision, or mock exams</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600 mt-8">
          📢 Join <strong>500+ Leaving Cert students & teachers</strong> already using Examinaite!
        </p>
        <Link href="/quiz/create">
  <Button 
    size="lg" 
    className="mt-6 bg-blue-600 hover:bg-blue-700"
  >
    🔹 Start Generating Questions Now →
  </Button>
</Link>
      </section>
    </div>
  );
}

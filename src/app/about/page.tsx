//src/app/about/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Hourglass, Circle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="container mx-auto px-4 pt-20 pb-16">
        {/* About Quiz Generator */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center">
          About Examinaite
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-6">
          Generate custom quizzes instantly, get real exam-style questions, and track your progress—all in one place.
        </p>

        {/* Embedded YouTube Video */}
        <div className="flex justify-center mb-12">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/8xGoWuRCyws"
            title="Examinaite Demo Video"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>

        {/* Our Mission & Why Use This App */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Exam preparation should be easier and smarter. Our goal is to provide students and teachers with 
                personalized, AI-powered tools that make studying more effective and less stressful.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Why Use Examinaite?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ AI-generated quizzes tailored to your needs</li>
                <li>✓ Real exam-style questions for Leaving Cert students</li>
                <li>✓ Easy-to-use and designed for all learning styles</li>
                <li>✓ Track your progress and build confidence</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Development Timeline (Reworded for Users) */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-6">
            What’s Coming Next?
          </h2>
          <ol className="space-y-4 max-w-2xl mx-auto">
            <li className="flex items-center text-lg text-green-600">
              <CheckCircle className="w-6 h-6 mr-3" />
              <span><strong>Launched:</strong> AI-powered quiz generator for Leaving Cert Maths</span>
            </li>
            <li className="flex items-center text-lg text-yellow-600">
              <Hourglass className="w-6 h-6 mr-3" />
              <span><strong>Next Up:</strong> User accounts to save quizzes, track scores, and improve study sessions</span>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-3" />
              <span><strong>Coming Soon:</strong> Diagrams & graphs added to questions for a richer learning experience</span>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-3" />
              <span><strong>For Teachers:</strong> Save and export quizzes as PDFs for classroom use</span>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-3" />
              <span><strong>More Subjects:</strong> Expanding quiz generation beyond Maths</span>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-3" />
              <span><strong>Mobile App:</strong> Bringing Examinaite to iOS & Android</span>
            </li>
          </ol>
        </div>

        {/* Meet Gavin Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Meet Gavin</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Hi, I’m Gavin Doyle—a teacher and software developer passionate about helping students succeed. 
            I built Examinaite because I know how overwhelming exam prep can be. This app is designed to 
            make studying more effective and stress-free. Let’s work smarter, not harder!
          </p>
        </div>
      </section>
    </div>
  );
}

// src/app/about.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Hourglass, Circle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="container mx-auto px-4 pt-20 pb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center">
          About Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-12">
          We’re here to help you feel confident, learn faster, and do your very best in your exams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our goal is to make studying easier and more fun. With tools that match your learning style, you can build confidence, understand tricky topics, and get the grades you want.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Why Use This App?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Quizzes made just for you based on what you need to learn</li>
                <li>✓ Easy-to-use and works for everyone</li>
                <li>✓ Track how you’re doing and celebrate your wins</li>
                <li>✓ Built with smart technology to make studying more effective</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-6">
            Development Timeline
          </h2>
          <ol className="space-y-4 max-w-2xl mx-auto">
            <li className="flex items-center text-lg text-green-600">
              <CheckCircle className="w-6 h-6 mr-3" />
              <span><strong>Phase 0:</strong> Home page, About page, and quiz generation for Leaving Cert Maths (Completed)</span>
            </li>
            <li className="flex items-center text-lg text-yellow-600">
              <Hourglass className="w-6 h-6 mr-3" />
              <span><strong>Phase 1:</strong> Add login/sign-up, state management for authentication, and a database (In Progress)</span>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-3" />
              <span><strong>Phase 2:</strong> Create a side navbar, quiz history page, and improve question generation with diagrams/graphs</span>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-3" />
              <span><strong>Phase 3:</strong> Enable photo-based answer checking and add teacher-specific features (e.g., save/export quizzes as PDFs)</span>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-3" />
              <span><strong>Phase 4:</strong> Launch web app, expand to other subjects, and introduce a subscription model</span>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-3" />
              <span><strong>Phase 5:</strong> Build and optimize a mobile app for iOS/Android</span>
            </li>
          </ol>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Meet Gavin
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Hi, I’m Gavin Doyle, a teacher who loves helping students succeed. I’ve taught PE and maths, and I’ve seen how hard it can be to feel ready for exams. That’s why I built this app—to give you the tools you need to study smarter and feel confident on exam day. Let’s do this together!
          </p>
        </div>
      </section>
    </div>
  );
}

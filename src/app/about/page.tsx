// src/app/about.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

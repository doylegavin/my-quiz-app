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
          Discover the story behind our AI-powered platform and how we empower students to master their studies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our mission is to make learning engaging, effective, and accessible for all students. We leverage AI to adapt to each learner's unique needs and provide tools that foster deep understanding and retention.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Personalized quizzes tailored to your strengths and weaknesses</li>
                <li>✓ Intuitive design with accessibility features for all learners</li>
                <li>✓ Insights and analytics to track progress</li>
                <li>✓ Cutting-edge technology for an unmatched learning experience</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us in Shaping the Future of Education
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Become part of a community of learners achieving their goals with innovative tools and support.
          </p>
        </div>
      </section>
    </div>
  );
}

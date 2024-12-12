// app/(marketing)/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <main className="container mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight">
            Master Your Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered revision tools designed for every learning style.
            Track progress, create quizzes, and achieve your academic goals.
          </p>
          <div className="space-x-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
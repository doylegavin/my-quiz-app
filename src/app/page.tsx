// src/app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Hourglass, Circle } from "lucide-react";
import Image from "next/image";
import WaitlistSection from "@/components/WaitlistSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pl-16 w-full max-w-[100vw] overflow-x-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10 text-center">
        <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-brand to-brand bg-clip-text text-transparent text-center drop-shadow-lg">
          Examinaite
        </h1>
        <h1 className="text-lg md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-brand to-brand bg-clip-text text-transparent">
          🚀 Personalised Exam-Style Questions So You Can Ace the Leaving Cert
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Generate exam-style questions instantly, just like the real thing—saving students and teachers hours of prep time
        </p>
      </section>

      {/* Join Waitlist Section - Now using the new component */}
      <WaitlistSection />

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
          <Button size="lg" className="mt-6 bg-brand hover:bg-brand">
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

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">What Teachers Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Testimonial 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand">
            <p className="text-gray-800 italic">
              "Has the potential to be really good, and the bones of it already look excellent."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— Teacher, Institute of Education</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand">
            <p className="text-gray-800 italic">
              "A tool that personalises learning would be a game-changer."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— SEN Co-Ordinator </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand">
            <p className="text-gray-800 italic">
              "The potential of this is huge, like, HUGE."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— Seán McWeeney, 10+ years Maths Teacher, Founder NW StemFest</p>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand">
            <p className="text-gray-800 italic">
              "I've been using this with my Leaving Certs, and it has really improved weaker students' ability and confidence."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">—  Maths & Science Teacher</p>
          </div>

          {/* Testimonial 5 */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand">
            <p className="text-gray-800 italic">
              "Chef's kiss, everything StudyClix is missing."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">—  Former StudyClix Employee, Maths & Science Teacher</p>
          </div>

          {/* Testimonial 6 */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand">
            <p className="text-gray-800 italic">
              "The Irish education system is seriously missing out on tools like this. An app like your proposal would be game-changing for teachers to facilitate revision in an interactive way."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— 6+ Years Teacher, Ireland & UK</p>
          </div>
          <div className="flex gap-4 justify-center pt-16">
          <Link href="/quiz/create">
            <Button size="lg" className="bg-brand hover:bg-brand py-3 md:py-4">
               <strong>Give it a Go 💪</strong>
            </Button>
          </Link>
          </div>
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
            <Button size="lg" className="bg-brand hover:bg-brand py-3 md:py-4">
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
          📢 Join <strong>Hundreds of Leaving Cert students & teachers</strong> already using Examinaite!
        </p>
        <Link href="/quiz/create">
          <Button 
            size="lg" 
            className="mt-6 bg-brand hover:bg-brand"
          >
            🔹 Start Generating Questions Now →
          </Button>
        </Link>
      </section>

      {/* Backed By Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Backed By</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <Link 
            href="https://www.newfrontiers.ie/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-40 md:w-48 h-24 relative flex items-center justify-center transform hover:scale-110 transition-all duration-300"
          >
            <Image 
              src="/images/backedby/enterprise-ireland.png" 
              alt="Enterprise Ireland"
              fill
              className="object-contain"
            />
          </Link>
          <Link 
            href="https://dogpatchlabs.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-40 md:w-48 h-24 relative flex items-center justify-center transform hover:scale-110 transition-all duration-300"
          >
            <Image 
              src="/images/backedby/dogpatch-labs.png" 
              alt="Dogpatch Labs"
              fill
              className="object-contain"
            />
          </Link>
          <Link 
            href="https://www.ndrc.ie/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-40 md:w-48 h-24 relative flex items-center justify-center transform hover:scale-110 transition-all duration-300"
          >
            <Image 
              src="/images/backedby/ndrc.png" 
              alt="NDRC"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <p className="text-gray-600 mt-8">
          Proudly supported by Ireland's leading innovation partners
        </p>
      </section>   
    </div>
  );
}
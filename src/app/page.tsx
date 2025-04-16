// src/app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 w-full max-w-[100vw] overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-4 pt-16 pb-8 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-brand to-brand bg-clip-text text-transparent">
          Exam prep, for everyone
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
          Join Hundreds of Students & Teachers Saving Hours on Exam Revision
        </p>
        <Link href="/quiz/create">
          <Button size="lg" className="mt-2 bg-brand hover:bg-brand/90 py-6 px-8 text-lg">
            Start Free Now
          </Button>
        </Link>
        <p className="text-sm text-gray-500 mt-3">No card needed. Takes seconds to start.</p>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="container mx-auto px-4 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-12 text-center" style={{textAlign: 'center'}}>How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow-md">
              <CardHeader className="text-center" style={{textAlign: 'center'}}>
                <CardTitle className="text-xl md:text-2xl font-bold text-center" style={{textAlign: 'center'}}>🔍 Choose Your Topic & Difficulty</CardTitle>
              </CardHeader>
              <CardContent className="text-center" style={{textAlign: 'center'}}>
                <p className="text-center" style={{textAlign: 'center'}}>AI-powered questions tailored to Higher, Ordinary, or Foundation Level. Prep effortlessly.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow-md">
              <CardHeader className="text-center" style={{textAlign: 'center'}}>
                <CardTitle className="text-xl md:text-2xl font-bold text-center" style={{textAlign: 'center'}}>📝 Instant Exam-Style Questions & Solutions</CardTitle>
              </CardHeader>
              <CardContent className="text-center" style={{textAlign: 'center'}}>
                <p className="text-center" style={{textAlign: 'center'}}>Generate realistic questions with detailed solutions & marking schemes instantly.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow-md">
              <CardHeader className="text-center" style={{textAlign: 'center'}}>
                <CardTitle className="text-xl md:text-2xl font-bold text-center" style={{textAlign: 'center'}}>📄 Practice and Track Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="text-center" style={{textAlign: 'center'}}>
                <p className="text-center" style={{textAlign: 'center'}}>Test yourself and see improvements right away.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Link href="/quiz/create">
          <Button size="lg" className="mt-10 bg-brand hover:bg-brand/90 py-6 px-8 text-lg">
            Generate Your First Question <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.section>

      {/* Who is it for? */}
      <motion.section 
        className="container mx-auto px-4 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-12 text-center" style={{textAlign: 'center'}}>Who Is It For?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow-md">
              <CardHeader className="text-center" style={{textAlign: 'center'}}>
                <CardTitle className="text-xl md:text-2xl font-bold text-center" style={{textAlign: 'center'}}>🧑‍🎓 Students</CardTitle>
              </CardHeader>
              <CardContent className="text-center" style={{textAlign: 'center'}}>
                <p className="text-center" style={{textAlign: 'center'}}>Boost your grades with personalised revision questions and step-by-step solutions.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow-md">
              <CardHeader className="text-center" style={{textAlign: 'center'}}>
                <CardTitle className="text-xl md:text-2xl font-bold text-center" style={{textAlign: 'center'}}>👩‍🏫 Teachers</CardTitle>
              </CardHeader>
              <CardContent className="text-center" style={{textAlign: 'center'}}>
                <p className="text-center" style={{textAlign: 'center'}}>Create customised exam papers in minutes, not hours.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full shadow-md">
              <CardHeader className="text-center" style={{textAlign: 'center'}}>
                <CardTitle className="text-xl md:text-2xl font-bold text-center" style={{textAlign: 'center'}}>📚 Tutors & Schools</CardTitle>
              </CardHeader>
              <CardContent className="text-center" style={{textAlign: 'center'}}>
                <p className="text-center" style={{textAlign: 'center'}}>Streamline assessments and track student progress effortlessly.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section - Kept unchanged as instructed */}
      <motion.section 
        className="container mx-auto px-4 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-12">What Teachers Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Testimonial 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand"
          >
            <p className="text-gray-800 italic">
              "Has the potential to be really good, and the bones of it already look excellent."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— Teacher, Institute of Education</p>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand"
          >
            <p className="text-gray-800 italic">
              "A tool that personalises learning would be a game-changer."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— SEN Co-Ordinator </p>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand"
          >
            <p className="text-gray-800 italic">
              "The potential of this is huge, like, HUGE."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— Seán McWeeney, 10+ years Maths Teacher, Founder NW StemFest</p>
          </motion.div>

          {/* Testimonial 4 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand"
          >
            <p className="text-gray-800 italic">
              "I've been using this with my Leaving Certs, and it has really improved weaker students' ability and confidence."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">—  Maths & Science Teacher</p>
          </motion.div>

          {/* Testimonial 5 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand"
          >
            <p className="text-gray-800 italic">
              "Chef's kiss, everything StudyClix is missing."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">—  Former StudyClix Employee, Maths & Science Teacher</p>
          </motion.div>

          {/* Testimonial 6 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-brand"
          >
            <p className="text-gray-800 italic">
              "The Irish education system is seriously missing out on tools like this. An app like your proposal would be game-changing for teachers to facilitate revision in an interactive way."
            </p>
            <p className="mt-4 text-gray-600 font-semibold">— 6+ Years Teacher, Ireland & UK</p>
          </motion.div>
        </div>
        <div className="flex gap-4 justify-center pt-16">
          <Link href="/quiz/create">
            <Button size="lg" className="bg-brand hover:bg-brand/90 py-3 md:py-6 px-8 text-lg">
               <strong>Give it a Go 💪</strong>
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Embedded YouTube Video */}
      <motion.section 
        className="container mx-auto px-4 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-12">See Examinaite in Action</h2>
        
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
        
        <p className="text-gray-600 mt-6 text-lg">
          See how Examinaite simplifies exam preparation in 90 seconds.
        </p>
        
        <div className="flex gap-4 justify-center pt-12">
          <Link href="/quiz/create">
            <Button size="lg" className="bg-brand hover:bg-brand/90 py-6 px-8 text-lg">
              🟢 <strong>TRY FOR FREE</strong>
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Why Examinaite? */}
      <motion.section 
        className="container mx-auto px-4 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-12">Why Examinaite?</h2>
        <ul className="text-lg text-gray-600 max-w-2xl mx-auto space-y-6">
          <li className="flex items-start justify-center text-center">
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-500 mb-2 h-6 w-6" />
              <div>
                <strong className="text-xl text-gray-800">Instant Question Generation</strong>
                <p className="mt-1">Save hours creating custom, Leaving Cert-standard questions.</p>
              </div>
            </div>
          </li>
          <li className="flex items-start justify-center text-center">
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-500 mb-2 h-6 w-6" />
              <div>
                <strong className="text-xl text-gray-800">Step-by-Step Solutions</strong>
                <p className="mt-1">Enhance real understanding, not just memorisation.</p>
              </div>
            </div>
          </li>
          <li className="flex items-start justify-center text-center">
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-500 mb-2 h-6 w-6" />
              <div>
                <strong className="text-xl text-gray-800">Exam-Ready Format</strong>
                <p className="mt-1">Practise confidently with officially formatted questions.</p>
              </div>
            </div>
          </li>
        </ul>
      </motion.section>

      {/* Easy Onboarding Section (New Section) */}
      <motion.section 
        className="container mx-auto px-4 py-20 text-center bg-gray-50 rounded-xl shadow-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-12">Get Started in 3 Easy Steps:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">1</div>
            <h3 className="text-xl font-bold mt-4 mb-2">Sign Up for Free</h3>
            <p className="text-gray-600">Create your account in seconds—no card required.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">2</div>
            <h3 className="text-xl font-bold mt-4 mb-2">Choose Your Subjects</h3>
            <p className="text-gray-600">Pick the Leaving Cert topics you need most.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">3</div>
            <h3 className="text-xl font-bold mt-4 mb-2">Start Practising Instantly</h3>
            <p className="text-gray-600">Immediate access to personalised questions and solutions.</p>
          </motion.div>
        </div>
        
        <Link href="/quiz/create">
          <Button size="lg" className="mt-12 bg-brand hover:bg-brand/90 py-6 px-8 text-lg">
            Start Free Now
          </Button>
        </Link>
      </motion.section>

      {/* Backed By Section */}
      <motion.section 
        className="container mx-auto px-4 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-12">Backed By</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-8">
          <Link 
            href="https://www.newfrontiers.ie/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-40 md:w-48 h-24 relative flex items-center justify-center transform hover:scale-110 transition-all duration-300"
          >
            <Image 
              src="/images/backedby/enterprise-ireland.png" 
              alt="Enterprise Ireland - Supporting Examinaite exam preparation platform"
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
              alt="Dogpatch Labs - Backing Examinaite's innovative education solutions"
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
              alt="NDRC - Supporting Examinaite's growth in education technology"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <p className="text-gray-700 text-lg">
          Trusted by Ireland's top innovation programmes—Enterprise Ireland, Dogpatch Labs, and NDRC.
        </p>
      </motion.section>
      
      {/* Final CTA */}
      <motion.section 
        className="container mx-auto px-4 py-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Exam Preparation?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join hundreds of students and teachers who are already saving hours on exam preparation.
        </p>
        <Link href="/quiz/create">
          <Button 
            size="lg" 
            className="bg-brand hover:bg-brand/90 py-6 px-10 text-xl"
          >
            Start Free Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <p className="text-sm text-gray-500 mt-3">No card needed. Takes seconds to start.</p>
      </motion.section>

    </div>
  );
}
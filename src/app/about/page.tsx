//src/app/about/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Hourglass, Circle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Head from "next/head";

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8">
      {/* SEO Metadata */}
      <Head>
        <title>About Examinaite | AI-Powered Leaving Cert Revision</title>
        <meta 
          name="description" 
          content="Discover how Examinaite uses AI to simplify Leaving Cert exam prep for students and teachers. Learn about our mission, roadmap, and founder story." 
        />
        <meta 
          name="keywords" 
          content="Leaving Cert, Exam Prep, AI-Generated Quizzes, Ireland, Teachers, Students" 
        />
      </Head>

      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-4 pt-16 pb-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-brand to-brand bg-clip-text text-transparent text-center" style={{textAlign: 'center'}}>
          About Examinaite </h1>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-brand to-brand bg-clip-text text-transparent text-center" style={{textAlign: 'center'}}>
              Reinventing Exam Prep with AI
              </h3> 
        
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 text-center" style={{textAlign: 'center'}}>
          Our mission is to <strong>transform exam culture</strong> by bringing <strong>personalised, AI-powered tools</strong> to students and teachers across Ireland. 
          Exam prep doesn't have to be stressful—let's make it <strong>smarter, faster, and tailored</strong> to you.
        </p>

        {/* Embedded YouTube Video */}
        <div className="w-full max-w-3xl mx-auto aspect-video relative mb-12">
          <iframe
            src="https://www.youtube.com/embed/8xGoWuRCyws"
            title="Examinaite Demo Video"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg absolute inset-0 w-full h-full"
          ></iframe>
        </div>
        <p className="text-gray-600 text-center mb-16" style={{textAlign: 'center'}}>
          See how Examinaite <strong>simplifies Leaving Cert revision</strong> in just 90 seconds.
        </p>
      </motion.section>

      {/* Our Mission & Why Examinaite */}
      <motion.section 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{textAlign: 'center'}}>Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8">
            At Examinaite, we believe every student deserves a <strong>stress-free, effective path</strong> to exam success. 
            That's why we built an AI-driven platform focused on <strong>three pillars</strong>:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/50 backdrop-blur shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-center" style={{textAlign: 'center'}}>Personalisation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center" style={{textAlign: 'center'}}>
                  <strong>Everyone learns differently</strong>. Examinaite <strong>adapts questions</strong> to your chosen subject, topic, and difficulty level, 
                  so you spend time only <strong>where you need it most</strong>.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-center" style={{textAlign: 'center'}}>Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center" style={{textAlign: 'center'}}>
                  <strong>Time is precious</strong>. Our AI <strong>instantly generates</strong> exam-style questions and detailed solutions, 
                  so you can focus on <strong>understanding and progress</strong> instead of endless prep.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-center" style={{textAlign: 'center'}}>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center" style={{textAlign: 'center'}}>
                  Whether you're a <strong>teacher juggling multiple classes</strong> or a <strong>student aiming for top grades</strong>, 
                  we aim to make advanced learning tools <strong>accessible to all</strong>.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center" style={{textAlign: 'center'}}>Why Use Examinaite?</h2>
          <div className="bg-white/50 backdrop-blur rounded-xl p-8 shadow-md mb-16">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-xl text-gray-800">AI-Powered Quizzes</strong>
                  <p className="text-gray-600">Save hours creating <strong>custom exam papers</strong>. Let our AI handle the <strong>heavy lifting</strong>.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-xl text-gray-800">Real Exam-Style Questions</strong>
                  <p className="text-gray-600">Align your study sessions with <strong>official Leaving Cert standards</strong>.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-xl text-gray-800">Track Your Progress</strong>
                  <p className="text-gray-600"><strong>Measure improvements</strong> over time and <strong>pinpoint areas</strong> you need to revisit.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-xl text-gray-800">Study at Your Pace</strong>
                  <p className="text-gray-600">Whether you're revising for maths, English, or any new subject we add, access everything <strong>on your schedule</strong>.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Our Roadmap */}
      <motion.section 
        className="container mx-auto px-4 py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{textAlign: 'center'}}>
            What's Coming Next?
          </h2>
          <ol className="space-y-6 mb-16">
            <li className="flex items-center text-lg text-green-600">
              <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>Launched:</strong> AI-Powered Quiz Generator for Leaving Cert Maths<br />
                <span className="text-gray-600 text-base">Already helping students and teachers save hours on question prep.</span>
              </div>
            </li>
            <li className="flex items-center text-lg text-green-600">
              <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>Completed:</strong> User Accounts<br />
                <span className="text-gray-600 text-base">Sign up to save quizzes, track scores, and personalise your study sessions.</span>
              </div>
            </li>
            <li className="flex items-center text-lg text-green-600">
              <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>Completed:</strong> Diagrams & Graphs<br />
                <span className="text-gray-600 text-base">Visual-rich questions for deeper understanding and real-world exam formats.</span>
              </div>
            </li>
            <li className="flex items-center text-lg text-green-600">
              <CheckCircle className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>Completed:</strong> Export Quizzes as PDFs<br />
                <span className="text-gray-600 text-base">Print or distribute official-like test papers for classroom use.</span>
              </div>
            </li>
            <li className="flex items-center text-lg text-yellow-600">
              <Hourglass className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>Next Up:</strong> Auto Correction<br />
                <span className="text-gray-600 text-base">Instantly grade your answers and receive personalized feedback.</span>
              </div>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>Coming Soon:</strong> Video Solutions<br />
                <span className="text-gray-600 text-base">Watch step-by-step explanations for complex problems.</span>
              </div>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>Coming Soon:</strong> Past Papers and Marking Schemes<br />
                <span className="text-gray-600 text-base">Access official exam papers with detailed marking guidelines.</span>
              </div>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>More Subjects:</strong> Beyond Maths<br />
                <span className="text-gray-600 text-base">We're expanding to cover more Leaving Cert subjects.</span>
              </div>
            </li>
            <li className="flex items-center text-lg text-gray-600">
              <Circle className="w-6 h-6 mr-4 flex-shrink-0" />
              <div>
                <strong>Mobile App:</strong> Anywhere, Anytime<br />
                <span className="text-gray-600 text-base">Bringing Examinaite's full functionality to iOS and Android.</span>
              </div>
            </li>
          </ol>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{textAlign: 'center'}}>
            Our Story
          </h2>
          
          {/* First Story Block - Meet Sarah */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Meet Sarah</h3>
              <p className="text-lg text-gray-700 mb-4">
                Sarah is a <strong>17-year-old Leaving Cert student</strong>. She's a <strong>hard worker</strong>, 
                but finds herself <strong>overwhelmed</strong> by the mounting pressure of exams. She's just 
                <strong> one of 70,000+ LC students</strong> preparing for her exams the <strong>same way her parents 
                did in 1995</strong> - with stacks of books, endless past papers, and no personalized support.
              </p>
            </div>
            <div className="md:w-1/2 h-72 bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img 
                src="/images/story/stressed-student.jpg" 
                alt="Stressed student studying with textbooks and papers" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Second Story Block - Meet Mr. Byrne */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Meet Mr. Byrne</h3>
              <p className="text-lg text-gray-700 mb-4">
                Mr. Byrne teaches a class with <strong>30 students</strong> who have 
                <strong> 30 different needs and abilities</strong>. He's passionate about helping each student 
                succeed, but with <strong>limited time and finite, outdated resources</strong>, he simply 
                <strong> can't keep up</strong> with creating customized materials for everyone.
              </p>
            </div>
            <div className="md:w-1/2 h-72 bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img 
                src="/images/story/overwhelmed-teacher.jpg" 
                alt="Teacher working late surrounded by papers to grade" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Third Story Block - The Problem */}
          <div className="bg-white/70 rounded-xl p-8 shadow-md mb-16">
            <h3 className="text-2xl font-bold mb-4 text-center" style={{textAlign: 'center'}}>The Current Reality</h3>
            <p className="text-lg text-gray-700 mb-4">
              Imagine a classroom where Sarah, a secondary school student, struggles to grasp complex concepts because 
              the revision materials don't align with her visual learning style. <strong>Studies indicate that approximately 
              50.7% of secondary school students favour visual learning styles.</strong>
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Imagine reading a powerpoint that was all words. <strong>Horrible.</strong>
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Her teacher, Mr. Byrne, despite his dedication, finds himself overwhelmed with administrative duties and 
              constrained by traditional teaching methods. <strong>Research suggests that approximately 78% of classrooms 
              still employ teacher-centred approaches.</strong> This prevalent one-size-fits-all methodology leaves students 
              like Sarah without the tailored support they need to excel.
            </p>
          </div>
          
          {/* Fourth Story Block - The Solution */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">The Solution: Examinaite</h3>
              <p className="text-lg text-gray-700 mb-4">
                <strong>What are they to do? Why isn't there a solution?</strong>
              </p>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Well... Now there is!</strong>
              </p>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Examinaite</strong> is an <strong>AI-powered adaptive learning platform</strong> that generates 
                unlimited, exam-style questions tailored to each student's ability and learning style. Sarah receives 
                engaging visual explanations. Mr. Byrne saves hours with instant feedback and curriculum-aligned tools. 
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Whether in class or at home, <strong>Examinaite delivers personalised learning, anytime, anywhere</strong>—so 
                every student can reach their potential 🚀
              </p>
            </div>
            <div className="md:w-1/2 h-72 bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <img 
                src="/images/story/solution-examinaite.jpg" 
                alt="Student confidently studying with Examinaite on a laptop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Founder's Story */}
      <motion.section 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-3xl mx-auto bg-white/70 rounded-xl p-8 shadow-md mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{textAlign: 'center'}}>Meet Gavin</h2>
          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-4">
              I'm Gavin Doyle—a teacher and software developer who's seen firsthand how <strong>repetitive and overwhelming</strong> 
              exam prep can be. For years, I watched students struggle with endless past papers, and teachers pour 
              hours into designing fresh assessments. I asked myself: <strong>"What if we could automate the busywork 
              and give everyone more time for real learning?"</strong>
            </p>
            <p className="text-lg text-gray-700 mb-4">
              That question led to Examinaite. By merging <strong>technology and teaching principles</strong>, I've built a platform 
              designed to make learning truly <strong>efficient and effective</strong>. My hope is that Examinaite becomes a <strong>trusted 
              ally</strong> for anyone aiming to ace the Leaving Cert—without the usual stress and burnout. Let's <strong>study smarter, not harder</strong>.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="container mx-auto px-4 py-16 text-center bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{textAlign: 'center'}}>Ready to See Examinaite in Action?</h2>
          <p className="text-xl text-gray-600 mb-8 text-center" style={{textAlign: 'center'}}>
            Start generating your own <strong>AI-powered exam questions</strong> and watch your <strong>confidence grow</strong>. 
            Whether you're a <strong>student gearing up for finals</strong> or a <strong>teacher looking to simplify prep</strong>, 
            we've got you covered.
          </p>
          <Link href="/quiz/create">
            <Button 
              size="lg" 
              className="bg-brand hover:bg-brand/90 py-6 px-10 text-xl"
            >
              Start Creating Quizzes <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

// src/components/Sidebar.tsx
"use client"; // Needed for state management in Next.js App Router
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Menu icons
import { useSession, signIn, signOut } from "next-auth/react";
import emailjs from "@emailjs/browser";





export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: session } = useSession();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      { message: feedback },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      alert("Feedback submitted successfully!");
      setFeedback("");
    })
    .catch(() => {
      alert("Failed to send feedback. Please try again.");
    })
    .finally(() => setIsSubmitting(false));
  };


  return (
    <div className={`bg-purple-600 text-white py-3 ${isOpen ? "w-64" : "w-16"} transition-width duration-300 flex flex-col`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className={`flex flex-col gap-4 ${isOpen ? "p-4" : "p-2"} transition-all duration-300`}>
      <Link href="/">
          <span className="block px-3 py-2 rounded hover:bg-purple-800">{isOpen ? "Home" : ""}</span>
        </Link>
        <Link href="/dashboard">
          <span className="block px-3 py-2 rounded hover:bg-purple-800">{isOpen ? "Dashboard" : ""}</span>
        </Link>
        <Link href="/quiz/create">
          <span className="block px-3 py-2 rounded hover:bg-purple-800">{isOpen ? "Create Quiz" : ""}</span>
        </Link>
        <Link href="/about">
          <span className="block px-3 py-2 rounded hover:bg-purple-800">{isOpen ? "About" : ""}</span>
        </Link>
      </nav>
       {/* Sign In / User Info */}
      <div className="p-4 border-t border-purple-500">
        {session ? (
          <div className="flex items-center justify-between">
            <Link href="/profile" className="flex items-center gap-3">
              <img src={session.user?.image || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full" />
              {isOpen && <span className="text-lg">{session.user?.name}</span>}
            </Link>
            <button onClick={() => signOut()} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              {isOpen ? "Logout" : "🚪"}
            </button>
          </div>
        ) : (
          <button onClick={() => signIn()} className="bg-white text-purple-600 w-full py-2 rounded hover:bg-gray-200">
            {isOpen ? "Sign In" : "🔑"}
          </button>
        )}
      </div>
      {/* Quick Feedback Form */}
      <div className="p-4 border-t border-purple-500">
        <h3 className="text-sm font-semibold mb-2">{isOpen ? "Quick Anonymous Feedback" : "💬"}</h3>
        <form onSubmit={handleSubmitFeedback} className="space-y-2">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            className="w-full px-3 py-2 text-black border rounded-lg"
            required
          />
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiHome, FiEdit, FiInfo, FiSend, FiUser } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import emailjs from "@emailjs/browser";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Default to closed
  const { data: session } = useSession();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Track screen size for mobile behavior

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return; // Prevent empty submissions
    setIsSubmitting(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { message: feedback },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setFeedback("");
        setFeedbackSent(true);
        setTimeout(() => setFeedbackSent(false), 3000);
      })
      .catch(() => alert("Failed to send feedback. Please try again."))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div
      className={`bg-purple-600 text-white py-3 ${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300 flex flex-col fixed top-0 left-0 h-full shadow-lg z-50`}
    >
      {/* Sidebar Toggle Button */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 p-2 transition-all duration-300">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-purple-800 transition">
          <FiHome size={20} /> {isOpen && "Home"}
        </Link>
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-purple-800 transition">
          <FiEdit size={20} /> {isOpen && "Dashboard"}
        </Link>
        <Link href="/quiz/create" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-purple-800 transition">
          <FiSend size={20} /> {isOpen && "Create Quiz"}
        </Link>
        <Link href="/about" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-purple-800 transition">
          <FiInfo size={20} /> {isOpen && "About"}
        </Link>
      </nav>

      {/* Quick Feedback Form (Hidden when sidebar is collapsed) */}
      {isOpen && (
        <div className="p-4 border-t border-purple-500">
          <h3 className="text-sm font-semibold mb-2">Quick Anonymous Feedback</h3>
          <form onSubmit={handleSubmitFeedback} className="space-y-2">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback..."
              className="w-full px-3 py-2 text-black border rounded-lg"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
          {feedbackSent && <p className="text-green-300 text-sm mt-2 text-center">✅ Feedback submitted! Thank you!</p>}
        </div>
      )}

      {/* Sign In / User Info (Always at the bottom) */}
      <div className="mt-auto p-4 border-t border-purple-500">
        {session ? (
          <div className="flex items-center justify-between">
            <Link href="/profile" className="flex items-center gap-3">
              <img src={session.user?.image || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full" />
              {isOpen && <span className="text-lg">{session.user?.name}</span>}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              {isOpen ? "Logout" : "🚪"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-white text-purple-600 w-full py-2 rounded hover:bg-gray-200 transition"
          >
            {isOpen ? "Sign In" : "🔑"}
          </button>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiHome, FiEdit, FiInfo, FiSend, FiUser, FiLogOut, FiLogIn, FiFileText } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { useSession, signOut } from "next-auth/react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";

/**
 * Main sidebar navigation component - Now with improved responsive behavior
 */
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Default to closed
  const { data: session, status } = useSession();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Track screen size for mobile behavior
  const initialStateSet = useRef(false);
  const router = useRouter();

  // Initialize EmailJS
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      console.log("EmailJS initialized");
    } else {
      console.error("EmailJS public key not found");
    }
  }, []);

  // Detect screen size and set initial state only once
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768; // Include 768px in mobile behavior
      setIsMobile(mobile);
      
      // Set initial state to closed for all screen sizes
      if (!initialStateSet.current) {
        setIsOpen(false); // Always start closed
        initialStateSet.current = true;
      }
    };
    
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return; // Prevent empty submissions
    setIsSubmitting(true);
    
    console.log("Submitting feedback:", feedback);
    console.log("EmailJS keys:", {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.substring(0, 5) + "..." // Log only part of the key for security
    });

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { 
          message: feedback,
          from_name: session?.user?.name || "Anonymous User",
          from_email: session?.user?.email || "anonymous@user.com"
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      console.log("EmailJS success:", result);
      setFeedback("");
      setFeedbackSent(true);
      setTimeout(() => setFeedbackSent(false), 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      console.log("Starting sign out process");
      // First clear client-side session
      const result = await signOut({ 
        redirect: false,
        callbackUrl: '/'
      });
      console.log("Sign out completed:", result);
      
      // Force a hard refresh after sign out to ensure all state is cleared
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      // Fallback approach
      window.location.href = '/api/auth/signout';
    }
  };

  const handleSignIn = () => {
    // Use the new route naming
    router.push("/signin?callbackUrl=/");
  };

  // If on mobile and sidebar is closed, just show the hamburger button
  // If on mobile and sidebar is open, show the full sidebar with a backdrop
  // If on desktop, always show the sidebar, either collapsed or expanded
  return (
    <>
      {/* Mobile hamburger menu button - Only visible on mobile when sidebar is closed */}
      {isMobile && !isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="fixed top-4 left-4 z-40 p-2 rounded-full bg-brand text-white shadow-lg"
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Mobile backdrop - Only visible on mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar component */}
      <div
        className={`bg-brand text-white py-3 ${
          isOpen ? "w-64" : "w-16"
        } transition-all duration-300 flex flex-col fixed inset-y-0 z-50 shadow-lg overflow-y-auto
          ${isMobile ? 
            (isOpen ? "translate-x-0" : "translate-x-[-100%]") : 
            "translate-x-0"
          }`}
      >
        {/* Sidebar Toggle Button */}
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white text-2xl"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 p-2 transition-all duration-300">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-brand-dark transition"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FiHome size={20} /> {isOpen && "Home"}
          </Link>
          <Link 
            href="/quiz/create" 
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-brand-dark transition"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FiEdit size={20} /> {isOpen && "Create Quiz"}
          </Link>
          
          <Link 
            href="/exams" 
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-brand-dark transition"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FiFileText size={20} /> {isOpen && "Exam Papers"}
          </Link>
          
          {/* VARK Learning Style Assessment Link */}
          <Link 
            href="/vark" 
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-brand-dark transition"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <LuBrain size={20} /> {isOpen && "Which learner are you?"}
          </Link>
          
          <Link 
            href="/about" 
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-brand-dark transition"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FiInfo size={20} /> {isOpen && "About"}
          </Link>
        </nav>

        {/* Quick Feedback Form (Hidden when sidebar is collapsed) */}
        {isOpen && (
          <div className="p-4 border-t border-brand">
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
                className="w-full bg-brand-light text-white py-2 rounded-lg hover:bg-brand-dark transition"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
            {feedbackSent && <p className="text-green-300 text-sm mt-2 text-center">✅ Feedback submitted! Thank you!</p>}
          </div>
        )}

        {/* Sign In / User Info (Always at the bottom) */}
        <div className="mt-auto p-4 border-t border-brand">
          {status === "loading" ? (
            <div className="flex justify-center">
              <div className="animate-pulse h-10 w-full bg-brand-dark rounded"></div>
            </div>
          ) : session?.user ? (
            <div className="flex items-center justify-between">
              <Link 
                href="/profile" 
                className="flex items-center gap-3"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <img 
                  src={session.user.image || "/default-avatar.png"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    // Fallback for image loading errors
                    (e.target as HTMLImageElement).src = "/default-avatar.png";
                  }}
                />
                {isOpen && <span className="text-lg truncate max-w-[120px]">{session.user.name}</span>}
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                aria-label="Sign out"
              >
                {isOpen ? "Logout" : <FiLogOut />}
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-white text-brand w-full py-2 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2"
              aria-label="Sign in"
            >
              {isOpen ? (
                <>
                  <FiLogIn /> Sign In
                </>
              ) : (
                <FiLogIn />
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Add spacing on non-mobile screens to prevent content from being hidden under sidebar */}
      {!isMobile && (
        <div className={`transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`} aria-hidden="true" />
      )}
    </>
  );
} 
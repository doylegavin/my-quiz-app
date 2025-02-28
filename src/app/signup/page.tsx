//src/app/auth/signup/page.tsx

'use client';

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
      <div className="container max-w-md mx-auto bg-white/50 backdrop-blur rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Sign Up
        </h1>
        <p className="text-gray-600 mb-8">
          Join our platform to access personalized learning and adaptive quizzes.
        </p>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-2"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </Button>
        <p className="text-gray-500 mt-4 text-sm">
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-purple-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-purple-600 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
}

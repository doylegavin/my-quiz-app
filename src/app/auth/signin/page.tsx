//src/app/auth/signin/page.tsx

"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
        
        {/* Error Message Display */}
        <p className="text-red-500 text-sm text-center mb-2">
          {/* Replace with actual error handling */}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>Or sign in with</p>
          <button
            onClick={() => signIn("google")}
            className="w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("instagram")}
            className="w-full bg-pink-500 text-white py-2 rounded-lg mt-2 hover:bg-pink-600"
          >
            Sign in with Instagram
          </button>

          <button
            onClick={() => signIn("tiktok")}
            className="w-full bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-800"
          >
            Sign in with TikTok
          </button>
        </div>

        {/* 👇 Add the Sign-Up Link Here 👇 */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

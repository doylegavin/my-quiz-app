"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthTestPage() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [currentPort, setCurrentPort] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Get the current port for debugging
    if (typeof window !== "undefined") {
      setCurrentPort(window.location.port || "3000");
    }
  }, []);

  // Map Clerk auth state to the status format used before
  const status = !isLoaded ? "loading" : userId ? "authenticated" : "unauthenticated";

  const handleSignIn = () => {
    router.push('/sign-in?redirect_url=/auth-test');
  };

  const handleSignOut = async () => {
    router.push('/sign-out?redirect_url=/auth-test');
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page (Clerk)</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <div className="mb-4">
          <strong>Current Status:</strong> {status}
        </div>
        
        <div className="mb-4">
          <strong>Current Port:</strong> {currentPort}
        </div>
        
        {!isLoaded ? (
          <div className="animate-pulse h-10 w-full bg-gray-200 rounded mb-4 dark:bg-gray-700"></div>
        ) : userId && user ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Logged In</h2>
            <div className="bg-green-50 p-4 rounded border border-green-200 dark:bg-green-900/30 dark:border-green-800">
              <p><strong>User:</strong> {user.fullName}</p>
              <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
              <p><strong>ID:</strong> {userId}</p>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Not Logged In</h2>
            <p className="text-red-500 dark:text-red-400">Please sign in to see your user information.</p>
          </div>
        )}
        
        <div className="flex gap-4">
          {!userId ? (
            <button
              onClick={handleSignIn}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 
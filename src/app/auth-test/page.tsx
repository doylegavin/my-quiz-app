"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AuthTestPage() {
  const { data: session, status } = useSession();
  const [currentPort, setCurrentPort] = useState<string>("");

  useEffect(() => {
    // Get the current port for debugging
    if (typeof window !== "undefined") {
      setCurrentPort(window.location.port || "3000");
    }
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Current Status:</strong> {status}
        </div>
        
        <div className="mb-4">
          <strong>Current Port:</strong> {currentPort}
        </div>
        
        {status === "loading" ? (
          <div className="animate-pulse h-10 w-full bg-gray-200 rounded mb-4"></div>
        ) : session ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Logged In</h2>
            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p><strong>User:</strong> {session.user?.name}</p>
              <p><strong>Email:</strong> {session.user?.email}</p>
              <p><strong>ID:</strong> {session.user?.id}</p>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Not Logged In</h2>
            <p className="text-red-500">Please sign in to see your user information.</p>
          </div>
        )}
        
        <div className="flex gap-4">
          <button
            onClick={() => signIn(undefined, { callbackUrl: "/auth-test" })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={!!session}
          >
            Sign In
          </button>
          
          <button
            onClick={() => signOut({ callbackUrl: "/auth-test" })}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={!session}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 
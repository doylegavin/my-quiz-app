"use client";

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useSearchParams } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onAuthenticated: () => void;
}

export default function AuthModal({ isOpen, onAuthenticated }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle error messages from URL parameters
    const error = searchParams?.get("error");
    if (error) {
      switch (error) {
        case "OAuthSignin":
          setErrorMsg("Error starting OAuth sign-in. Please try again.");
          break;
        case "OAuthCallback":
          setErrorMsg("Error during OAuth callback. Please try again.");
          break;
        case "OAuthAccountNotLinked":
          setErrorMsg("Email already in use with a different provider.");
          break;
        case "EmailSignin":
          setErrorMsg("Error sending the email. Please try again.");
          break;
        case "CredentialsSignin":
          setErrorMsg("Invalid email or password. Please try again.");
          break;
        case "SessionRequired":
          setErrorMsg("Please sign in to access this page.");
          break;
        default:
          setErrorMsg(`An error occurred: ${error}`);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email and password are required");
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMsg("");
      
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setErrorMsg(result.error);
        return;
      }
      
      // Success
      onAuthenticated();
      
    } catch (error) {
      console.error("Sign-in error:", error);
      setErrorMsg("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { redirect: false })
      .then((result) => {
        if (result?.error) {
          setErrorMsg(result.error);
          setIsLoading(false);
        } else {
          // Success will be handled by the session change
          // onAuthenticated will be called by parent component via session state
        }
      })
      .catch((err) => {
        console.error("OAuth sign-in error:", err);
        setErrorMsg("Failed to sign in with provider");
        setIsLoading(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Authentication Required</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Please sign in to access this content
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
            <div className="text-sm text-red-700 dark:text-red-200">
              {errorMsg}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-5" /> Sign in with Google
            </button>
            
          </div>
          
          
        </div>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
          <Link 
            href="/signup" 
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
} 
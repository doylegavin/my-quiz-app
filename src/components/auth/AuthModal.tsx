"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { useSearchParams } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onAuthenticated: () => void;
}

export default function AuthModal({ isOpen, onAuthenticated }: AuthModalProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const redirectToClerkSignIn = () => {
    // Get the current URL to use as a redirect after sign-in
    const currentPath = window.location.pathname;
    router.push(`/sign-in?redirect_url=${encodeURIComponent(currentPath)}`);
  };

  const redirectToClerkSignUp = () => {
    // Get the current URL to use as a redirect after sign-up
    const currentPath = window.location.pathname;
    router.push(`/sign-up?redirect_url=${encodeURIComponent(currentPath)}`);
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
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={redirectToClerkSignIn}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                Or
              </span>
            </div>
          </div>

          <button
            onClick={redirectToClerkSignUp}
            className="w-full rounded-md bg-white px-4 py-2 text-indigo-600 border border-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create an Account
          </button>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
} 
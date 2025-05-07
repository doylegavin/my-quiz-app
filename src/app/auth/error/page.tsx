'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('An error occurred during authentication');
  const [errorDescription, setErrorDescription] = useState('Please try signing in again.');

  useEffect(() => {
    // Get error type from URL
    const error = searchParams.get('error');
    
    if (error) {
      switch (error) {
        case 'CredentialsSignin':
          setErrorMessage('Invalid login credentials');
          setErrorDescription('The email or password you entered is incorrect.');
          break;
        case 'OAuthAccountNotLinked':
          setErrorMessage('Account not linked');
          setErrorDescription('This email is already associated with another account. Please sign in using your original provider.');
          break;
        case 'OAuthSignin':
          setErrorMessage('OAuth sign in error');
          setErrorDescription('There was a problem with the OAuth sign in. Please try again or use a different method.');
          break;
        case 'OAuthCallback':
          setErrorMessage('OAuth callback error');
          setErrorDescription('There was a problem completing the OAuth process. This could be due to cookies or browser settings.');
          break;
        case 'EmailSignin':
          setErrorMessage('Email sign in error');
          setErrorDescription('There was a problem sending the sign in email. Please try again.');
          break;
        case 'EmailCreateAccount':
          setErrorMessage('Problem creating account');
          setErrorDescription('There was a problem creating your account. Please try again.');
          break;
        case 'SessionRequired':
          setErrorMessage('Session required');
          setErrorDescription('You need to be signed in to access this page.');
          break;
        default:
          setErrorMessage('Authentication error');
          setErrorDescription('An error occurred during the authentication process. Please try again.');
      }
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-red-100 p-4 dark:bg-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-full w-full text-red-600 dark:text-red-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {errorMessage}
        </h2>
        
        <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
          {errorDescription}
        </p>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Link
            href="/signin"
            className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 
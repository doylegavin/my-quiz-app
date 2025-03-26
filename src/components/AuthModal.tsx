"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  returnUrl?: string;
}

export default function AuthModal({ isOpen, onClose, returnUrl = '' }: AuthModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal if user becomes authenticated
  useEffect(() => {
    if (status === 'authenticated' && session && onClose) {
      console.log('User authenticated, closing modal');
      onClose();
    }
  }, [status, session, onClose]);

  if (!mounted || !isOpen || status === 'authenticated') {
    return null;
  }

  const encodedReturnUrl = encodeURIComponent(returnUrl || window.location.pathname);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="mb-6 dark:text-gray-300">You need to sign in to access this feature.</p>
        
        <div className="flex flex-col space-y-3">
          <Link 
            href={`/signin?callbackUrl=${encodedReturnUrl}`}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700"
          >
            Sign In
          </Link>
          
          <Link 
            href={`/signup?callbackUrl=${encodedReturnUrl}`}
            className="w-full border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-md text-center hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Sign Up
          </Link>
          
          {onClose && (
            <button
              onClick={onClose}
              className="w-full border border-gray-300 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 
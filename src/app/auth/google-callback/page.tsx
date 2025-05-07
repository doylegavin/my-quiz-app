'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (!code) {
      setError('Missing authorization code');
      setIsProcessing(false);
      return;
    }

    // Handle the callback
    const handleCallback = async () => {
      try {
        let callbackUrl = '/';
        
        // Decode the state parameter if it exists
        if (state) {
          try {
            callbackUrl = Buffer.from(state, 'base64').toString();
          } catch (e) {
            console.error('Failed to decode state:', e);
          }
        }
        
        // Manually trigger sign in with the received code
        const result = await signIn('google', {
          redirect: false,
          callbackUrl,
          code,
        });
        
        if (result?.error) {
          setError(result.error);
          setIsProcessing(false);
          return;
        }
        
        // Redirect to the callback URL
        router.push(callbackUrl);
      } catch (err) {
        console.error('Error processing Google callback:', err);
        setError('An unexpected error occurred');
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  // If already signed in, redirect to home
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-red-600 dark:text-red-400">Authentication Error</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{error}</p>
          <button
            onClick={() => router.push('/signin')}
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Return to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Completing Google Sign In...
        </h2>
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaFacebook } from 'react-icons/fa';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

export function FacebookLoginButton() {
  const router = useRouter();
  const [fbLoaded, setFbLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if FB SDK is loaded
    if (window.FB) {
      setFbLoaded(true);
    } else {
      // If not loaded yet, wait for fbAsyncInit to fire
      const originalFbAsyncInit = window.fbAsyncInit;
      window.fbAsyncInit = function() {
        if (originalFbAsyncInit) {
          originalFbAsyncInit();
        }
        setFbLoaded(true);
      };
    }
  }, []);

  const handleFacebookLogin = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // If FB SDK not loaded, fall back to NextAuth
    if (!fbLoaded || !window.FB) {
      console.log('Facebook SDK not loaded, using NextAuth fallback');
      signIn('facebook', { callbackUrl: '/' });
      return;
    }

    window.FB.login(async (response: any) => {
      if (response.authResponse) {
        const { accessToken, userID } = response.authResponse;
        
        // Get user info from Facebook
        window.FB.api('/me', { fields: 'email,name' }, async (userInfo: any) => {
          if (!userInfo || !userInfo.email) {
            console.error('Failed to get email from Facebook');
            setIsLoading(false);
            signIn('facebook', { callbackUrl: '/' });
            return;
          }
          
          try {
            const res = await fetch('/api/auth/facebook-callback', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                accessToken,
                userID,
                name: userInfo.name,
                email: userInfo.email
              })
            });
            
            if (res.ok) {
              // Refresh the page to update auth state
              window.location.href = '/';
            } else {
              console.error('Failed to authenticate with Facebook');
              // Fall back to NextAuth
              signIn('facebook', { callbackUrl: '/' });
            }
          } catch (error) {
            console.error('Error during Facebook authentication', error);
            // Fall back to NextAuth
            signIn('facebook', { callbackUrl: '/' });
          } finally {
            setIsLoading(false);
          }
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
        setIsLoading(false);
      }
    }, { scope: 'email,public_profile' });
  };

  return (
    <Button 
      className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white"
      onClick={handleFacebookLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        <>
          <FaFacebook className="mr-2 h-4 w-4" />
          Continue with Facebook
        </>
      )}
    </Button>
  );
} 
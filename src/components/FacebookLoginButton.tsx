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
    if (!fbLoaded) {
      console.error('Facebook SDK not loaded yet');
      // Fallback to NextAuth's Facebook provider if SDK isn't loaded
      signIn('facebook', { callbackUrl: '/' });
      return;
    }

    window.FB.login(async (response: any) => {
      if (response.authResponse) {
        const { accessToken, userID } = response.authResponse;
        
        // Get user info from Facebook
        window.FB.api('/me', { fields: 'email,name' }, async (userInfo: any) => {
          // Option 1: Handle auth on client side with custom endpoint
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
              // Redirect or refresh session
              router.refresh();
            } else {
              console.error('Failed to authenticate with Facebook');
            }
          } catch (error) {
            console.error('Error during Facebook authentication', error);
            
            // Option 2: Fallback to NextAuth if custom endpoint fails
            signIn('facebook', { callbackUrl: '/' });
          }
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email,public_profile' });
  };

  return (
    <Button 
      className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white"
      onClick={handleFacebookLogin}
    >
      <FaFacebook className="mr-2 h-4 w-4" />
      Continue with Facebook
    </Button>
  );
} 
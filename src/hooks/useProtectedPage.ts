"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';

export default function useProtectedPage() {
  const { data: session, status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathname = usePathname();
  
  // Debug the session state to help diagnose issues
  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
  }, [status, session]);
  
  useEffect(() => {
    // Show modal only if authentication check is complete and user is not signed in
    if (status === 'unauthenticated') {
      setShowAuthModal(true);
    } else if (status === 'authenticated') {
      setShowAuthModal(false);
    }
  }, [status]);

  // Handle successful authentication
  const handleAuthenticated = () => {
    setShowAuthModal(false);
  };

  // Render the auth modal and page overlay
  const authOverlay = showAuthModal && (
    <>
      {/* Apply dimming effect to the main content - use pointer-events-auto to allow clicks on the overlay */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 pointer-events-auto" />
      
      {/* Auth modal */}
      <AuthModal 
        isOpen={true} 
        onAuthenticated={handleAuthenticated}
      />
    </>
  );

  return {
    session,
    status,
    showAuthModal,
    closeAuthModal: handleAuthenticated,
    returnUrl: pathname,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    authOverlay
  };
} 
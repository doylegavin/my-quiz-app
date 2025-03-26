"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import AuthModal from '@/components/AuthModal';

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

  const closeAuthModal = () => {
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
        onClose={closeAuthModal} 
        returnUrl={pathname} 
      />
    </>
  );

  return {
    session,
    status,
    showAuthModal,
    closeAuthModal,
    returnUrl: pathname,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    authOverlay
  };
} 
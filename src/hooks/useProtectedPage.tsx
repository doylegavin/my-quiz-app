"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AuthModal from '@/components/auth/AuthModal';

/**
 * Hook for protecting pages that require authentication
 * Shows an auth modal for unauthenticated users and dims the page
 */
export default function useProtectedPage() {
  const { data: session, status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  useEffect(() => {
    // If the user is not authenticated (and we've checked session status), show the modal
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
      {/* Apply dimming effect to the main content */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50 pointer-events-none" />
      
      {/* Auth modal */}
      <AuthModal isOpen={true} onAuthenticated={handleAuthenticated} />
    </>
  );

  return {
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    authOverlay,
    session
  };
} 
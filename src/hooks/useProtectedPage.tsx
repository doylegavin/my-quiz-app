"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';

export default function useProtectedPage() {
  const { userId, isLoaded: isAuthLoaded } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathname = usePathname();
  
  // Debug the auth state to help diagnose issues
  useEffect(() => {
    console.log('Auth loaded:', isAuthLoaded);
    console.log('User ID:', userId);
  }, [isAuthLoaded, userId]);
  
  useEffect(() => {
    // Show modal only if authentication check is complete and user is not signed in
    if (isAuthLoaded && !userId) {
      setShowAuthModal(true);
    } else if (isAuthLoaded && userId) {
      setShowAuthModal(false);
    }
  }, [isAuthLoaded, userId]);

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
    session: userId ? { user: { id: userId } } : null, // Compatible with old format
    status: !isAuthLoaded ? 'loading' : userId ? 'authenticated' : 'unauthenticated',
    showAuthModal,
    closeAuthModal: handleAuthenticated,
    returnUrl: pathname,
    isAuthenticated: isAuthLoaded && !!userId,
    isLoading: !isAuthLoaded,
    authOverlay
  };
} 
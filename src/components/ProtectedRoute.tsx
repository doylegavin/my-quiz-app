"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return; // Wait for the session to load
    }

    if (!session) {
      // User is not authenticated, redirect to sign-in
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    } else {
      setIsLoading(false); // User is authenticated, render content
    }
  }, [session, status, router, pathname]);

  if (isLoading || status === "loading") {
    // You can show a loading spinner here
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  return <>{children}</>;
} 
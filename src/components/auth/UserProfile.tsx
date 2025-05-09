'use client';

import { useUser, useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserProfile() {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { isLoaded: authLoaded, userId, sessionId, getToken } = useAuth();
  const [tokenDisplay, setTokenDisplay] = useState<string | null>(null);
  
  // Show loading state while Clerk loads
  if (!userLoaded || !authLoaded) {
    return <div className="flex justify-center items-center p-8">Loading user data...</div>;
  }
  
  // Show signed-out state
  if (!isSignedIn) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>
            You need to sign in to view your profile information.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const handleGetToken = async () => {
    try {
      const token = await getToken();
      setTokenDisplay(token ? `${token.substring(0, 20)}...` : 'No token available');
    } catch (error) {
      console.error('Error getting token:', error);
      setTokenDisplay('Error retrieving token');
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your current user information from Clerk</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={user.imageUrl} 
              alt={user.fullName || 'User'} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{user.fullName}</h3>
            <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">User ID</h4>
          <p className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">{userId}</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Session ID</h4>
          <p className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">{sessionId}</p>
        </div>
        
        {tokenDisplay && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Session Token (truncated)</h4>
            <p className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">{tokenDisplay}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetToken} variant="outline" className="w-full">
          Get Session Token
        </Button>
      </CardFooter>
    </Card>
  );
} 
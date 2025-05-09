import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import UserProfile from '@/components/auth/UserProfile';

export default async function AuthDemoPage() {
  // Get authentication information from Clerk using the auth() helper
  const { userId, sessionId } = await auth();
  
  // Protect the page - if not signed in, redirect to sign-in
  if (!userId) {
    redirect('/sign-in?redirect_url=/auth-demo');
  }
  
  // Get the complete user object using currentUser()
  const user = await currentUser();
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Auth Demo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page demonstrates both server-side and client-side authentication with Clerk.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Server-Side Auth</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-4">User Data (from Server)</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">User ID:</p>
                <p className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">{userId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Session ID:</p>
                <p className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">{sessionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name:</p>
                <p className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email:</p>
                <p className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {user?.emailAddresses[0]?.emailAddress || 'Not available'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Client-Side Auth</h2>
          <UserProfile />
        </div>
      </div>
    </div>
  );
} 
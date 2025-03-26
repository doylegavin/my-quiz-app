# Setting Up OAuth for Your Quiz App

This guide will help you set up OAuth authentication for your quiz application, focusing on Google OAuth as an example.

## Prerequisites
- A Google account
- Your application running on a domain (localhost works for testing)

## Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" and select "OAuth client ID"
5. Set up the OAuth consent screen if prompted:
   - Select "External" or "Internal" user type (external for public apps)
   - Add your app name, user support email, and developer contact information
   - Add domain information (localhost is fine for development)
   - Add scopes (email and profile are sufficient for most auth needs)
   - Click "Save and Continue" through each section

6. For the OAuth client ID:
   - Choose "Web application" as the application type
   - Give your client a name (e.g., "Quiz App Web Client")
   - Add authorized JavaScript origins: `http://localhost:3000` (for local development)
   - Add authorized redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google`
     - Add your production URLs when ready for deployment
   - Click "Create"

7. You'll get a client ID and client secret - save these securely!

## Update Your Environment Variables
1. Open your `.env.local` file
2. Update the Google OAuth variables:
```
GOOGLE_CLIENT_ID=your-client-id-from-google
GOOGLE_CLIENT_SECRET=your-client-secret-from-google
NEXT_PUBLIC_HAS_GOOGLE_AUTH=true
```

3. Save the file and restart your development server:
```
npm run dev
```

## Testing Your OAuth Setup
1. Navigate to your sign-in page
2. You should now see the Google sign-in button
3. Click it and you should be redirected to Google's authentication page
4. After signing in with Google, you'll be redirected back to your application

## Troubleshooting
If you see the "OAuth client was not found" error:
1. Double-check your client ID and client secret in .env.local
2. Verify that your redirect URIs match exactly (including http/https)
3. Make sure you've enabled the "Google+ API" or "Google People API" for your project
4. Check that your OAuth consent screen is properly configured

## Adding Other Providers
Follow similar steps for GitHub, Instagram, or other providers, updating the relevant environment variables for each.

Remember to keep your client secrets secure and never commit them to public repositories. 
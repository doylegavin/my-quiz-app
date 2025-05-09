# Vercel Environment Variables Setup

To fix the Clerk authentication errors, you need to add the following environment variables to your Vercel project:

1. Go to your Vercel dashboard: https://vercel.com
2. Select your project "my-quiz-app" or "examinaite"
3. Go to "Settings" tab
4. Click on "Environment Variables" in the left sidebar
5. Add the following variables:

## Required Clerk Variables

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_ZW5nYWdlZC1wdW1hLTc4LmNsZXJrLmFjY291bnRzLmRldiQ` | Production, Preview, Development |
| `CLERK_SECRET_KEY` | `sk_test_lLxKQYiWPMBl4e5W0SuIXCIzwOCcbXSJ4vCMp9D8YE` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_PROXY_URL` | `https://examinaite.ie/clerk-api` | Production |
| `CLERK_WEBHOOK_SECRET` | `whsec_your_clerk_webhook_secret` | Production, Preview, Development |

## For local environments different from production:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_CLERK_PROXY_URL` | `http://localhost:3000/clerk-api` | Development |

After adding these variables:

1. Go to "Deployments" tab
2. Find your latest deployment
3. Click the three dots menu and select "Redeploy"
4. Choose "Redeploy with existing build cache" option

This should resolve the missing publishable key errors. 
# OAuth Configuration Guide

This guide explains how to configure OAuth for both development and production environments.

## Google OAuth Configuration

### Authorized JavaScript Origins:
- Development: `http://localhost:3000`
- Production: `https://examinaite.ie`

### Authorized Redirect URIs:
- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://examinaite.ie/api/auth/callback/google`

## Environment Configuration

### For Local Development:
1. Make sure `.env.local` has:
   ```
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

2. Start the development server with:
   ```
   npm run dev
   ```

### For Production:
1. When deploying to production, make sure:
   - Your production environment has `NEXTAUTH_URL` set to `https://examinaite.ie`
   - `NODE_ENV` is set to `production`

2. You can use the `.env.production` file or set these variables in your hosting platform (Vercel).

## Troubleshooting

If you encounter `redirect_uri_mismatch` errors:

1. **Check your environment variables**: Ensure `NEXTAUTH_URL` matches exactly what's configured in the Google Developer Console.

2. **Verify Google Console settings**: Make sure all your redirect URIs are properly configured.

3. **Remember URL matching is exact**: Even small differences like trailing slashes or http vs https will cause errors.

4. **Changes may not be immediate**: After updating OAuth settings in Google Console, it can take a few minutes for changes to propagate.

## Important Notes

- The `/api/auth/callback/google` route is automatically handled by NextAuth.js via the `[...nextauth]` API route.
- Always access your app using the exact URL configured in the Google Developer Console.
- When moving between development and production, make sure to update the `NEXTAUTH_URL` environment variable. 
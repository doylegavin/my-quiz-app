//src/app/api/auth/[...nextauth]/route.tsx

import { authOptions } from "@/lib/auth/nextAuth";
import NextAuth from "next-auth";

// Use the centralized authOptions from nextAuth.ts
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Add Edge Runtime support
export const runtime = 'edge';

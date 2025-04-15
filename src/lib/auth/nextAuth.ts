import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "../db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

// Improve the getBaseUrl function
function getBaseUrl() {
  // For local development, explicitly use localhost
  if (process.env.NODE_ENV === "development") {
    console.log("Using development URL:", process.env.NEXTAUTH_URL_DEVELOPMENT || "http://localhost:3000");
    return process.env.NEXTAUTH_URL_DEVELOPMENT || "http://localhost:3000";
  }
  
  // For production, use the production URL
  if (process.env.NODE_ENV === "production") {
    console.log("Using production URL:", process.env.NEXTAUTH_URL);
    return process.env.NEXTAUTH_URL || "";
  }
  
  // Fallback to window location in browser
  if (typeof window !== "undefined") {
    console.log("Using browser URL:", window.location.origin);
    return window.location.origin;
  }
  
  // Final fallback
  console.log("Using fallback URL:", process.env.NEXTAUTH_URL || "http://localhost:3000");
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}

// Define interface types for provider profiles
interface InstagramProfile {
  id: string;
  username?: string;
  email?: string;
  profile_picture?: string;
  [key: string]: any;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    signOut: `/signout`,
    error: `/error`,
    newUser: `/signup`,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, email: true, password: true, name: true, image: true },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }
        
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }
        
        return user;
      },
    }),
  ],
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
}; 
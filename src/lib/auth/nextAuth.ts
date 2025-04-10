import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { directPrisma } from "@/lib/db/prisma";
import TikTokProvider from "next-auth/providers/tiktok";

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
  if (typeof window !== "undefined") {
    // In the browser, use the current window location
    return window.location.origin;
  }
  // In server-side, use the environment variable without port or default to localhost:3000
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
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      const db_user = await directPrisma.user.findFirst({
        where: {
          email: token?.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
      }
      
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(directPrisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_ID as string,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET as string,
      authorization: { params: { scope: "user.info.basic" } },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.display_name || profile.username,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
      profile(profile: InstagramProfile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email || `${profile.username}@instagram.user`,
          image: profile.profile_picture,
        }
      },
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
        
        const user = await directPrisma.user.findUnique({
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
  // Update paths to match the new route structure
  pages: {
    signIn: `/signin`,
    signOut: `/signout`,
    error: `/error`,
    newUser: `/signup`,
  },
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
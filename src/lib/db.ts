import { PrismaClient } from "@prisma/client";
import "server-only";

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined
}

// Ensure database URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

// Create the Prisma Client
export const prisma = 
  global.prisma || 
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

// Avoid recreating the prisma client in development
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
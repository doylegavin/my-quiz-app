import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient;
  directPrisma: PrismaClient;
}

// Add prisma to the NodeJS global type
declare const global: CustomNodeJsGlobal;

// Function to get correct database URL based on context
const getDatasourceUrl = () => {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  
  return url;
};

// Get direct (unpooled) database URL for auth operations if available
const getDirectDatasourceUrl = () => {
  return process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
};

// Define the database URLs
const dbUrl = getDatasourceUrl();
const directDbUrl = getDirectDatasourceUrl();

// Create Prisma clients
let prisma: PrismaClient;
let directPrisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, create new clients
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });
  
  directPrisma = new PrismaClient({
    datasources: {
      db: {
        url: directDbUrl,
      },
    },
  });
} else {
  // In development, reuse existing clients or create new ones
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    });
  }
  
  if (!global.directPrisma) {
    global.directPrisma = new PrismaClient({
      datasources: {
        db: {
          url: directDbUrl,
        },
      },
    });
  }
  
  prisma = global.prisma;
  directPrisma = global.directPrisma;
}

export { prisma, directPrisma };
export default prisma; 
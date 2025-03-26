/**
 * Prisma client configuration
 * Central database connection handlers with pooled and direct connections
 */
import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined
  var directPrisma: PrismaClient | undefined
}

// Helper function to determine if an operation should use direct connection
// Certain operations work better with direct connections, especially in Neon
const getDatasourceUrl = (operation?: string) => {
  // Auth operations often need direct connections to avoid pooling issues
  const authOperations = ['findUnique', 'create', 'update', 'delete'];
  const isDirect = operation && authOperations.includes(operation);
  
  return isDirect && process.env.DATABASE_URL_UNPOOLED 
    ? process.env.DATABASE_URL_UNPOOLED 
    : process.env.DATABASE_URL;
};

// Standard pooled connection for general operations
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  // Better error handling for database connection issues
  errorFormat: 'pretty',
})

// Direct connection for auth operations
export const directPrisma = global.directPrisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  errorFormat: 'pretty',
  datasources: {
    db: {
      url: process.env.DATABASE_URL_UNPOOLED
    }
  }
})

// Avoid recreating the prisma client each time in development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
  global.directPrisma = directPrisma
}

// Export a default instance for convenience
export default prisma; 
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request) {
  let prismaInstance = null;

  try {
    // Try to create a new PrismaClient instance
    prismaInstance = new PrismaClient();
    
    // Check if the client is defined
    if (!prismaInstance) {
      return NextResponse.json({ 
        error: 'PrismaClient is undefined after initialization' 
      }, { status: 500 });
    }
    
    // Return information about the database connection
    return NextResponse.json({ 
      message: "Database connection check",
      prismaClientInitialized: !!prismaInstance,
      environment: process.env.NODE_ENV || 'unknown',
      databaseUrl: process.env.DATABASE_URL ? 'Set (masked for security)' : 'Not set'
    });
  } catch (error) {
    console.error('Error testing database connection:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error';
      
    const errorStack = error instanceof Error 
      ? error.stack 
      : '';
    
    return NextResponse.json(
      { 
        error: 'Failed to initialize database connection',
        details: errorMessage,
        stack: errorStack
      },
      { status: 500 }
    );
  } finally {
    if (prismaInstance) {
      await prismaInstance.$disconnect();
    }
  }
} 
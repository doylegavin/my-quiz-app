// Simple script to test database connection and user creation
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Attempting to connect to the database...');
  
  try {
    // Test connection by querying for a user count
    const userCount = await prisma.user.count();
    console.log(`Database connection successful. Current user count: ${userCount}`);
    
    // Try to create a test user
    const hashedPassword = await bcrypt.hash('testpassword123', 10);
    
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`, // Ensure unique email
        password: hashedPassword,
      },
    });
    
    console.log('User created successfully:', user);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 
// This script tests database connectivity
const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);
    
    // Try a simple query
    const userCount = await prisma.user.count();
    console.log(`Connection successful! Found ${userCount} users.`);
    
    // Test account model
    const accountCount = await prisma.account.count();
    console.log(`Found ${accountCount} accounts.`);
    
    return true;
  } catch (error) {
    console.error('Database connection error:');
    console.error(error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabaseConnection()
  .then(success => {
    if (success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 
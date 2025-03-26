// Simple test script to verify database connection
const { PrismaClient } = require('@prisma/client');

// Test both pooled and direct connections
async function testConnections() {
  console.log('🧪 TESTING DATABASE CONNECTIONS 🧪');
  console.log('==================================\n');
  
  // Test pooled connection first
  console.log('1️⃣ Testing pooled connection:');
  const pooledUrl = process.env.DATABASE_URL;
  await testConnection(pooledUrl, 'Pooled');
  
  console.log('\n----------------------------------\n');
  
  // Then test direct connection
  console.log('2️⃣ Testing direct connection:');
  const directUrl = process.env.DATABASE_URL_UNPOOLED;
  await testConnection(directUrl, 'Direct');
}

async function testConnection(url, connectionType) {
  if (!url) {
    console.log(`❌ No ${connectionType} connection URL found in environment variables.`);
    return false;
  }
  
  console.log(`🔍 Testing ${connectionType} connection...`);
  console.log(`🔗 Using connection URL: ${url.replace(/:.+@/, ':****@')}`);
  
  // Create a new prisma instance with this specific URL
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    },
    log: ['error', 'warn'],
  });
  
  try {
    // Simple query that should work if connection is good
    const result = await prisma.$queryRaw`SELECT current_timestamp, current_database(), version()`;
    console.log(`✅ ${connectionType} connection successful!`);
    console.log('📊 Database info:', result[0]);
    
    // Attempt to list tables
    const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
    console.log('📋 Available tables:', tables.map(t => t.table_name));
    
    return true;
  } catch (error) {
    console.error(`❌ ${connectionType} connection failed!`);
    console.error('🚨 Error:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the tests
testConnections()
  .then(() => {
    console.log('\n==================================');
    console.log('\n📝 If both connections failed:');
    console.log('1. Verify you\'ve added the actual password to your .env file');
    console.log('2. Check if your Neon database compute is running in the dashboard');
    console.log('3. Verify your IP is not being blocked');
    console.log('4. Try forcing a compute restart in the Neon dashboard');
  }); 
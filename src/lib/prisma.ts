// Re-export from the new location
import { prisma, directPrisma } from '@/lib/db/prisma';

export { prisma, directPrisma };
export default prisma; 
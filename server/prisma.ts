import { PrismaClient } from '@prisma/client';

/** Use Prisma as GraphQL query builder. */
// export const prisma = new PrismaClient({ log: ['query'] });
export const prisma = new PrismaClient();

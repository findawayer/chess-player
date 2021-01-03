import { PrismaClient } from '@prisma/client';

/** Use Prisma as GraphQL query builder. */
export const prisma = new PrismaClient();

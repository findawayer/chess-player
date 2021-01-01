import { PrismaClient } from '@prisma/client';

/** Use Prisma as GraphQL query builder. */
export const prismaClient = new PrismaClient();

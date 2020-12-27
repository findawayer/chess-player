import { PrismaClient } from '@prisma/client';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

export const prismaLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
): void => {
  // Use Prisma as GraphQL query builder.
  const prismaClient = new PrismaClient();
  // Cache the created app as the microframework's internal data.
  settings.setData('prismaClient', prismaClient);
};

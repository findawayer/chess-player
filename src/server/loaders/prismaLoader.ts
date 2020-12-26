import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

import environment from '~/environment';

export interface Context {
  prisma: PrismaClient;
  currentUser?: string;
}

export const prismaLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
): void => {
  /**
   * GraphQL query builder.
   * @docs https://www.prisma.io/docs/concepts/components/prisma-client
   */
  const prisma = new PrismaClient();
  /**
   * Create context for the GraphQL server powered by `Apollo Server` —
   * Context is an object that is passed to every resolver calls,
   * to make resolvers share useful context, such as a DB connection.
   * @see: https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument
   */
  const createContext = (request: Request): Context => ({
    prisma,
    currentUser: request.userId,
  });
  // Cache the created app as the microframework's internal data.
  settings.setData(environment.server.contextKey, createContext);
};

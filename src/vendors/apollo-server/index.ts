import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { getUserId } from '~/helpers/users';
import { schema } from '~/vendors/nexus';

interface NextApiContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface Context {
  prisma: PrismaClient;
  res: NextApiResponse;
  userId: string | null;
}

// Environment check.
const isDevelopment = process.env.NODE_ENV === 'development';

// Use Prisma as GraphQL query builder.
const prismaClient = new PrismaClient();

// Share context with resolvers.
const createContext = ({ req, res }: NextApiContext): Context => {
  const userId = req ? getUserId(req) : null;
  return {
    prisma: prismaClient,
    res,
    userId,
  };
};

// Create GraphQL server using `Apollo Server`.
// Docs: https://www.apollographql.com/docs/apollo-server/
const apolloServer = new ApolloServer({
  schema,
  playground: isDevelopment,
  introspection: isDevelopment,
  // mocks: isDevelopment,
  context: createContext,
});

export default apolloServer;

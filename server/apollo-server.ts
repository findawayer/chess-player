// Required for TypeGraphQL
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { buildSchema } from 'type-graphql';

import { authChecker } from './auth-checker';
import { GraphQLContext } from './interfaces';
import { UserResolver } from './schemas';
import { getServerSession } from './utils';

/**
 * Create new context with current user data populated on top of
 * the GraphQL context, to help resolvers easily access user data.
 */
export const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<GraphQLContext> => {
  const user = await getServerSession(req);
  return { req, res, user };
};

/** Create GraphQL server with `apollo-server-micro`. */
export const createServer = async (): Promise<ApolloServer> => {
  // Check environment.
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Build TypeGraphQL executable schema.
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker,
  });

  // Create Apollo server.
  const apolloServer = new ApolloServer({
    schema,
    // Enable playground in development mode.
    playground: isDevelopment,
    introspection: isDevelopment,
    // Include data tracing.
    tracing: isDevelopment,
    // mocks: isDevelopment,
    context: createContext,
  });

  return apolloServer;
};

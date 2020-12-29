import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { PrismaClient } from '@prisma/client';

import { schema } from '~/database';

interface ExpressContext {
  req: express.Request;
  res: express.Response;
  connection?: unknown; // ExecutionParams from `subscriptions-transport-ws` package.
}

export interface Context extends Partial<Pick<ExpressContext, 'res'>> {
  prisma: PrismaClient;
  userId?: string;
}

export const apolloLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
): void => {
  if (!settings) {
    throw new Error(`Unable to find Prisma context.`);
  }
  // Get previously created Express app
  const expressApp: express.Express = settings.getData('expressServer');
  // Get previously created Prisma context creator function.
  const prismaClient: PrismaClient = settings.getData('prismaClient');
  /**
   * Create context for the GraphQL server powered by `Apollo Server` —
   * Context is an object that is passed to every resolver calls,
   * to make resolvers share useful context, such as a DB connection.
   * @see: https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument
   */
  const createContext = ({ req, res, connection }: ExpressContext): Context => {
    if (connection) {
      return { prisma: prismaClient };
    }
    return { prisma: prismaClient, res, userId: req.userId };
  };
  // Create GraphQL server using `Apollo Server`.
  // Docs: https://www.apollographql.com/docs/apollo-server/
  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
  });
  // Configure CORS policy for the apollo server.
  // (For some-reason-god-knows-why, using cors middleware inside the express instnace
  //  did NOT work with the client.)
  const corsOptions = {
    credentials: true,
    origin: process.env.CLIENT_ENDPOINT,
  };
  // Integrate express instance to the Apollo Server.
  apolloServer.applyMiddleware({ app: expressApp, cors: corsOptions });
  // Cache the created app as the microframework's internal data.
  settings.setData('apolloServer', apolloServer);
};

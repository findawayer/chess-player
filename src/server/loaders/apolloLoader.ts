import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

import environment from '~/environment';
import { schema } from '~/database';
import { Context } from './prismaLoader';

export const apolloLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
): void => {
  if (!settings) {
    throw new Error(`Unable to find Prisma context.`);
  }
  // Get previously created Express app
  const expressApp: Express = settings.getData(environment.server.expressKey);
  // Get previously created Prisma context creator function.
  const createContext: () => Context = settings.getData(
    environment.server.contextKey,
  );
  // Create GraphQL server using `Apollo Server`.
  // Docs: https://www.apollographql.com/docs/apollo-server/
  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
    // Trace query resolution stats for benchmark.
    // tracing: environment.isDevelopment,
  });
  // Integrate express instance to the Apollo Server.
  apolloServer.applyMiddleware({ app: expressApp });
  // Cache the created app as the microframework's internal data.
  settings.setData(environment.server.apolloKey, apolloServer);
};

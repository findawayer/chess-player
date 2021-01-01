import { ApolloServer } from 'apollo-server-micro';

import { createContext } from './graphql-context';
import { schema } from './nexus';

// Environment check.
const isDevelopment = process.env.NODE_ENV === 'development';

// Create GraphQL server powered by `Apollo server`.
// Docs: https://www.apollographql.com/docs/apollo-server/
const apolloServer = new ApolloServer({
  // GraphQL schema created by `graphql-nexus`
  schema,
  // Enable playground in development mode.
  playground: isDevelopment,
  introspection: isDevelopment,
  // Include data tracing.
  tracing: isDevelopment,
  // mocks: isDevelopment,
  context: createContext,
});

export default apolloServer;

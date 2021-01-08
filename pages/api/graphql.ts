// Required for TypeGraphQL
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-micro';
import type { NextApiHandler } from 'next';
import NextCors from 'nextjs-cors';
import { buildSchema } from 'type-graphql';

import { authChecker } from '~server/auth-checker';
import { createContext } from '~server/context';
import { UserResolver } from '~server/schemas';

// Next.js API route config
// https://nextjs.org/docs/api-routes/api-middlewares
export const config = {
  api: {
    bodyParser: false,
  },
};

// Check environment.
const isDevelopment = process.env.NODE_ENV === 'development';

// Cache route handler.
let handler: NextApiHandler;

const apiHandler: NextApiHandler = async (req, res) => {
  // Run the cors middleware
  await NextCors(req, res, {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: [
      'Origin',
      'Access-Control-Allow-Origin',
      'Content-Type',
      'Accept',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // Use cached handler.
  if (handler) {
    return handler(req, res);
  }

  // Build TypeGraphQL executable schema.
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker,
  });

  // Create Apollo server.
  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
    // Enable playground in development mode.
    playground: isDevelopment,
    introspection: isDevelopment,
    // Include data tracing.
    tracing: isDevelopment,
    // mocks: isDevelopment,
  });

  // Create new handler.
  handler = apolloServer.createHandler({
    path: '/api/graphql',
  });

  return handler(req, res);
};

export default apiHandler;

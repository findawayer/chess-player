import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

/** Authenticated user paylaod exposed to GraphQL context. */
export type AuthUserPayload = Pick<User, 'id' | 'name' | 'role'>;

/** Context for the GraphQL server, that resolvers can extract useful data from. */
export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  user: AuthUserPayload | null;
}

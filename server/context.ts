import { NextApiRequest, NextApiResponse } from 'next';

import { GraphQLContext } from './interfaces';
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

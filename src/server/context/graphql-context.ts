import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { parseAccessToken } from '../utils/auth';
import { UserAccessPayload } from '../typedefs/users';

export interface NextApiContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface Context {
  prisma: PrismaClient;
  res: NextApiResponse;
  user: UserAccessPayload | null;
}

/** Use Prisma as GraphQL query builder. */
const prismaClient = new PrismaClient();

/** Retrieve currently user from cookies. */
const getUserFromRequest = async (
  req?: NextApiRequest,
): Promise<UserAccessPayload | null> => {
  // Silently handle when server request object is not available.
  if (!req) return null;
  // Decode access token stored as cookies.
  const decoded = await parseAccessToken(req.cookies.accessToken);
  // Return the user id.
  return decoded ?? null;
};

// Share context with resolvers.
export const createContext = async ({
  req,
  res,
}: NextApiContext): Promise<Context> => {
  const user = await getUserFromRequest(req);
  return {
    prisma: prismaClient,
    res,
    user,
  };
};

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prismaClient } from './prisma';
import { parseAccessToken, UserAuthPayload } from './utils/auth';

export interface NextApiContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export interface Context {
  prisma: PrismaClient;
  res: NextApiResponse;
  user: UserAuthPayload | null;
}

/** Retrieve currently user from cookies. */
const getUserFromRequest = async (
  req?: NextApiRequest,
): Promise<UserAuthPayload | null> => {
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
  // Populate auth user to the GraphQL context to allow access by resolvers.
  const user = await getUserFromRequest(req);
  return { prisma: prismaClient, res, user };
};

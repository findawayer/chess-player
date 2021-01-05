import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';
import cookie from 'cookie';

import { ACCESS_TOKEN_KEY } from '~server/constants';
import { AuthUserPayload, GraphQLContext } from '~server/interfaces';
import { prisma } from '~server/prisma';
import { createAccessToken, parseAccessToken } from './auth';
import { setCookie } from './cookies';

/** Retrieve currently user from cookies. */
export const getServerSession = async (
  req?: NextApiRequest | IncomingMessage,
): Promise<AuthUserPayload | null> => {
  // There are cases where `req` is unavailable. (e.g. pages/_app.tsx)
  if (!req) {
    return null;
  }
  const cookies = cookie.parse(req.headers.cookie || '');
  // Decode access token stored as cookies.
  const decoded = await parseAccessToken(cookies[ACCESS_TOKEN_KEY]);
  // If no access token is found, return null.
  if (!decoded) {
    return null;
  }
  // Find the user matching the token.
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    // Return the desired payload.
    return user ? { id: user.id, name: user.name, role: user.role } : null;
  } catch (error) {
    console.error(error);
    // Throwing an error will make the server crash.
    return null;
  }
};

/** Set user logged in. */
export const handleSuccessfulLogin = async (
  { id }: AuthUserPayload,
  context: GraphQLContext,
): Promise<void> => {
  // Genrate a JWT token.
  const accessToken = createAccessToken({ id });
  // Set the cookie with the token.
  setCookie(context.res, ACCESS_TOKEN_KEY, accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  });
};

/** Set user logged out. */
export const handleSuccessfulLogout = async (
  context: GraphQLContext,
): Promise<void> => {
  setCookie(context.res, ACCESS_TOKEN_KEY, '', {
    maxAge: 0,
    path: '/',
  });
};

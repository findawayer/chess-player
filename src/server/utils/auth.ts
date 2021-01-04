import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';

import { ACCESS_TOKEN_KEY, SALT_ROUNDS } from '~/server/constants';
import { AuthUserPayload } from '~/server/interfaces';
import { prisma } from '~/server/prisma';
import { deleteCookie, setCookie } from './cookies';

/** User payload stored in cookie. */
export type CookieUserPayload = Pick<User, 'id'>;

/** Create Encrypted access token. */
export const createAccessToken = (payload: CookieUserPayload): string => {
  const token = jwt.sign(payload, process.env.APP_SECRET);
  return token;
};

/** Decode user access token. */
export const parseAccessToken = async (
  token?: string,
): Promise<CookieUserPayload | null> => {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.APP_SECRET) as CookieUserPayload;
  } catch (error) {
    // Don't display any error to the user.
    console.error(`Auth error`, error);
    return null;
  }
};

/** Encrypt passwords. */
export const hashPassword = async (password: string): Promise<string> => {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  return hashed;
};

/** Create new password reset token and its expiry. */
export const createPasswordResetToken = async (): Promise<{
  token: string;
  expires: number;
}> => {
  // Set a reset token and expiry on that user
  const promisifiedRandomBytes = promisify(crypto.randomBytes);
  // (It's better to run every module asynchronously for just in case)
  const token = (await promisifiedRandomBytes(20)).toString('hex');
  // Set this token expire in 1 hour.
  const expires = Date.now() + 60 * 60 * 1000;

  return { token, expires };
};

/** Retrieve currently user from cookies. */
export const getServerSession = async (
  req: NextApiRequest,
): Promise<AuthUserPayload | null> => {
  // Decode access token stored as cookies.
  const decoded = await parseAccessToken(req.cookies.accessToken);
  // If no access token is found, return null.
  if (!decoded) {
    return null;
  }
  // Find the user matching the token.
  try {
    const { id, name, role } = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    // Return the desired payload.
    return { id, name, role };
  } catch (error) {
    console.error(error);
    // Throwing an error will make the server crash.
    return null;
  }
};

/** Set user logged in. */
export const handleSuccessfulLogin = async (
  { id }: AuthUserPayload,
  res: NextApiResponse,
): Promise<void> => {
  // Genrate a JWT token.
  const accessToken = createAccessToken({ id });
  // Set the cookie with the token.
  setCookie(res, ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });
};

/** Set user logged out. */
export const handleSuccessfulLogout = async (
  res: NextApiResponse,
): Promise<void> => {
  // Remove user login token from cookie.
  deleteCookie(res, ACCESS_TOKEN_KEY);
  // clearCookie(res);
};

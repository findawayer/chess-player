import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { ACCESS_TOKEN_KEY, SALT_ROUNDS } from '../constants';
import { deleteCookie, setCookie } from './cookies';
import { AuthUser, UserAccessPayload } from '../typedefs/users';

export const createAccessToken = (payload: UserAccessPayload): string => {
  // Encrypt access token.
  const token = jwt.sign(payload, process.env.APP_SECRET);
  return token;
};

export const parseAccessToken = async (
  token?: string,
): Promise<UserAccessPayload | null> => {
  if (!token) return null;
  // Don't display any error to the user while decoding.
  try {
    // Decode access token.
    return jwt.verify(token, process.env.APP_SECRET) as UserAccessPayload;
  } catch (error) {
    console.error(`Auth error`, error);
    return null;
  }
};

/** Hash user passwords. */
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

/** Set user logged in. */
export const handleSuccessfulLogin = async (
  user: AuthUser,
  res: NextApiResponse,
): Promise<void> => {
  // Genrate a JWT token.
  const accessToken = createAccessToken({ id: user.id });
  // Set the cookie with the token.
  setCookie(res, ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });
};

export const handleSuccessfulLogout = async (
  res: NextApiResponse,
): Promise<void> => {
  // Remove user login token from cookie.
  deleteCookie(res, ACCESS_TOKEN_KEY);
};

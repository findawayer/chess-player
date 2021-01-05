import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { SALT_ROUNDS } from '~server/constants';

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

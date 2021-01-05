import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiResponse } from 'next';

/**
 * Set cookie using the `res` object from Next API.
 * Taken from `express`:  https://github.com/expressjs/express/blob/master/lib/response.js
 * Licensed under MIT according to the file in the root directory of the repository linked.
 */
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string | number | Record<string, unknown>,
  options: CookieSerializeOptions = {},
): void => {
  // Create cookie header string.
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);
  // Normalize expiry.
  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }
  // Set the cookie.
  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

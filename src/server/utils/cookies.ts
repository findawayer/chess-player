import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiResponse } from 'next';

/** Set cookie using the `res` object from Next API. */
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {},
): void => {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

export const deleteCookie = (res: NextApiResponse, name: string): void => {
  setCookie(res, name, '');
};

export const clearCookie = (res: NextApiResponse): void => {
  res.setHeader('Set-Cookie', serialize('', '', { expires: new Date() }));
};

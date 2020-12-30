import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

// Get current user logged in.
export const getUserId = (req: NextApiRequest): string | null => {
  // Find access token in cookies.
  const { accessToken } = req.cookies;
  // Not logged in.
  if (!accessToken) return null;
  // Decode access token
  const decoded = jwt.verify(accessToken, process.env.APP_SECRET);
  // Return the user's id.
  return (decoded as { userId: string }).userId;
};

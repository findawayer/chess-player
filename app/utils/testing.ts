import casual from 'casual';
import type { User } from '@prisma/client';

// Fixed seed for consistent results
casual.seed(255);

const fakeTime = new Date();

export const fakeUser = (overrides?: Partial<User>): User => ({
  id: 1,
  email: casual.email,
  password: '1234',
  name: casual.name,
  role: 'ADMIN',
  createdAt: fakeTime,
  updatedAt: fakeTime,
  verified: false,
  resetToken: null,
  resetTokenExpiry: null,
  colorMode: null,
  chessAutoQueen: null,
  chessBoardColor: null,
  chessShowLegal: null,
  chessShowRecent: null,
  ...overrides,
});

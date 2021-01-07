import type { User } from '@prisma/client';

export const mockUser = (overrides?: Partial<User>): User => ({
  id: 1,
  email: 'some@email.com',
  password: '1234',
  name: 'someone',
  role: 'ADMIN',
  createdAt: new Date(),
  updatedAt: new Date(),
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

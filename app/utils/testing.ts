import type { User } from '@prisma/client';

const fakeTime = new Date();

export const fakeUser = (overrides?: Partial<User>): User => ({
  id: 1,
  email: 'some@email.com',
  password: '1234',
  name: 'someone',
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

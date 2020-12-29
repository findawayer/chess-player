// Posisble values of user roles.
export type UserRole = 'SUPERUSER' | 'ADMIN' | 'USER';

// User object
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  resetToken: string;
  resetTokenExpiry: number;
}

// Fetched user with client-safe data.
export type UserPayload = Pick<
  User,
  'id' | 'name' | 'email' | 'verified' | 'role'
>;

// List of possible permissions.
export const USER_ROLES: ReadonlyArray<UserRole> = [
  'SUPERUSER',
  'ADMIN',
  'USER',
];

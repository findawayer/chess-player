import { User, UserRole } from '@prisma/client';

/** Test if a user is eligible to role-restricted data or content. */
export const hasRole = (
  user: Pick<User, 'role'>,
  targetRole: UserRole,
): boolean => user && user.role === targetRole;

/** Guard against  */
export const isAdmin = (user: Pick<User, 'role'>): boolean =>
  hasRole(user, UserRole.ADMIN);

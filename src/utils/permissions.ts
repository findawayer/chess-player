import {
  ADMIN_USER_ROLE,
  MIGHTY_USER_ROLE,
  USER_ROLES,
} from '~/server/constants';
import { AuthUser, UserRole } from '~/server/typedefs/users';

/** Get the position of passed role in the permission hierarchy. */
export const getRoleLevel = (role: UserRole): number => {
  if (!USER_ROLES.includes(role)) {
    throw new TypeError(`Unrecognized role name: ${role}`);
  }
  return USER_ROLES.indexOf(role);
};

/**
 * Check if an user's permissions are enough to access a specific permission level.
 * Users — including the `SUPERUSER` — can access user of lower level than theirs.
 */
export const hasPermissions = (
  user: AuthUser,
  targetRole: UserRole,
): boolean => {
  // Superuser always passes.
  if (user.role === MIGHTY_USER_ROLE) {
    return true;
  }
  const userLevel = getRoleLevel(user.role);
  const targetLevel = getRoleLevel(targetRole);
  // Throw if the user is not eligible.
  return userLevel < targetLevel;
};

export const canAccessAdmin = (user: AuthUser): boolean =>
  hasPermissions(user, ADMIN_USER_ROLE);

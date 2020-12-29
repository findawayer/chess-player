import { UserPayload, UserRole } from '~/typings/users';

// List of possible permissions.
export const USER_ROLES: ReadonlyArray<UserRole> = [
  'SUPERUSER',
  'ADMIN',
  'USER',
];

export const [MIGHTY_USER_ROLE, ...EDITABLE_USER_ROLES] = USER_ROLES;

export const getRoleLevel = (role: UserRole): number => {
  if (!USER_ROLES.includes(role)) {
    throw new Error(`Unrecognized role name: ${role}`);
  }
  return USER_ROLES.indexOf(role);
};

// Check if an user's permissions are enough to access a specific permission level.
// Users — including the `SUPERUSER` — can access user of lower level than theirs.
export const hasPermissions = (
  user: UserPayload,
  targetRole: UserRole,
): boolean => {
  // Superuser always passes.
  if (user.role === MIGHTY_USER_ROLE) {
    return true;
  }
  const userLevel = getRoleLevel(user.role);
  const targetLevel = getRoleLevel(targetRole);
  return userLevel < targetLevel;
};

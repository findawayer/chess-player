import { UserRole } from '@prisma/client';
import { AuthChecker } from 'type-graphql';

import { GraphQLContext } from './interfaces';

// create auth checker function
export const authChecker: AuthChecker<GraphQLContext, UserRole> = (
  { context: { user } },
  roles: UserRole[],
) => {
  // If `@Authorized()`, check only is user exist
  if (roles.length === 0) {
    return !!user;
  }
  // Restrict anon access
  if (!user) {
    return false;
  }
  // Grant access to users with target role
  if (roles.includes(user.role)) {
    return true;
  }
  // Restrict access if none of the roles matches
  return false;
};

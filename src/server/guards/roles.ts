import type { User } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-micro';

import { isAdmin } from '~/utils';

export const requireAdmin = (user: Pick<User, 'role'>): void | never => {
  if (!isAdmin(user)) {
    throw new ForbiddenError(`You are missing required permission.`);
  }
};

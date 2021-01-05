import { useContext } from 'react';

import { UserContext } from '~app/contexts';

import type { CurrentUser } from '~app/graphql';

/**
 * Hook that extracts auth user payload from the context.
 *
 * @returns Currently authenticated user.
 */
export const useUser = (): CurrentUser | null => {
  const user = useContext(UserContext);
  return user;
};

import { useQuery } from '@apollo/client';
import React, { createContext, useContext } from 'react';

import { CURRENT_USER_QUERY, CurrentUser } from '~app/graphql';

/** React context holding authenticated user payload. */
export const UserContext = createContext<CurrentUser | null>(null);

/** React provider for the user context above. */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useQuery<{ me: CurrentUser | null }>(CURRENT_USER_QUERY);

  return (
    <UserContext.Provider value={data ? data.me : null}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook that extracts auth user payload from the context.
 *
 * @returns Currently authenticated user.
 */
export const useUser = (): CurrentUser | null => {
  const user = useContext(UserContext);
  return user;
};

import { useQuery } from '@apollo/client';
import React, { createContext } from 'react';

import { CurrentUser, CURRENT_USER_QUERY } from '~app/graphql';

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

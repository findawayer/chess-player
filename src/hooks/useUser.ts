import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY, CurrentUser } from '~/graphql';

export const useUser = (): CurrentUser | undefined => {
  const { data } = useQuery<{ me: CurrentUser }>(CURRENT_USER_QUERY);
  return data?.me;
};

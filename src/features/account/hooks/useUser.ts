import { useQuery } from '@apollo/client';

import { AuthUser } from '~/server/utils';
import { CURRENT_USER_QUERY } from '../graphql';

export const useUser = (): AuthUser | void => {
  const { data } = useQuery<{ me: AuthUser }>(CURRENT_USER_QUERY);
  return data?.me;
};

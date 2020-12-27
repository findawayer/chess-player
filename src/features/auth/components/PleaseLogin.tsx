import React from 'react';
import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY } from '../queries/user';

interface PleaseLoginProps {
  children: React.ReactNode;
}

const PleaseLogin: React.FC<PleaseLoginProps> = ({ children }) => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (!data.me) return <p>Please log in before continuing.</p>;
  return <>{children}</>;
};

export default PleaseLogin;

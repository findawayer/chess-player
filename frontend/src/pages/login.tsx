import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';

import Login from '~/features/auth/components/Login';
import { CURRENT_USER_QUERY } from '~/features/auth/queries/user';

const LoginPage: React.FC = () => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);
  const router = useRouter();
  // Loading...
  if (loading) return null;
  // Redirect to home page if the user is already logged in.
  if (data?.me) {
    router.push('/');
  }
  // Show the login page otherwise.
  return (
    <Container maxWidth="xs">
      <Login />
    </Container>
  );
};

export default LoginPage;

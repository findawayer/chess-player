import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '@material-ui/core';

import Login from '~/features/account/components/Login';
import { useUser } from '~/features/account/hooks';

const LoginPage: React.FC = () => {
  const me = useUser();
  const router = useRouter();
  // Redirect to home page if the user is already logged in.
  if (me) {
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

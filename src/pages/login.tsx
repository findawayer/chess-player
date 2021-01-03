import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

import Signin from '~/features/account/components/Signin';
import { useUser } from '~/hooks';

const Login: React.FC = () => {
  const me = useUser();
  const router = useRouter();
  // Redirect to home page if the user is already logged in.
  if (me) {
    router.push('/');
    return null;
  }
  // Show the login page otherwise.
  return (
    <Container maxWidth="xs">
      <Signin />
    </Container>
  );
};

export default Login;

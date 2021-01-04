import { Container } from '@material-ui/core';
import React from 'react';

import Signin from '~/features/account/components/Signin';

const Login: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Signin />
    </Container>
  );
};

export default Login;

import { Container } from '@material-ui/core';
import React from 'react';

import Signup from '~/features/account/components/Signup';

const Join: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Signup />
    </Container>
  );
};

export default Join;

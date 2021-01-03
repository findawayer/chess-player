import { Container } from '@material-ui/core';
import React from 'react';

import RecoverPassword from '~/features/account/components/RecoverPassword';

const Recover: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <RecoverPassword />
    </Container>
  );
};

export default Recover;

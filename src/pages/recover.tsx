import React from 'react';
import { Container } from '@material-ui/core';

import RecoverPassword from '~/features/auth/components/RecoverPassword';

const RecoverPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <RecoverPassword />
    </Container>
  );
};

export default RecoverPage;

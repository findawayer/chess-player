import React from 'react';
import { Container } from '@material-ui/core';

import ResetPassword from '~/features/auth/components/ResetPassword';

const RecoverPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <ResetPassword />
    </Container>
  );
};

export default RecoverPage;

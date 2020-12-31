import React from 'react';
import { Container } from '@material-ui/core';

import PleaseLogin from '~/features/auth/components/PleaseLogin';
import ResetPassword from '~/features/auth/components/ResetPassword';

const RecoverPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <PleaseLogin>
        <ResetPassword />
      </PleaseLogin>
    </Container>
  );
};

export default RecoverPage;

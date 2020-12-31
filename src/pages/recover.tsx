import React from 'react';
import { Container } from '@material-ui/core';

import PleaseLogin from '~/features/auth/components/PleaseLogin';
import RecoverPassword from '~/features/auth/components/RecoverPassword';

const RecoverPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <PleaseLogin>
        <RecoverPassword />
      </PleaseLogin>
    </Container>
  );
};

export default RecoverPage;

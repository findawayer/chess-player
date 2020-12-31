import React from 'react';
import { Container } from '@material-ui/core';

import PleaseLogin from '~/features/account/components/PleaseLogin';
import RecoverPassword from '~/features/account/components/RecoverPassword';

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

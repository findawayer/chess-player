import { Container } from '@material-ui/core';
import React from 'react';

import PleaseLogin from '~/features/account/components/PleaseLogin';
import RecoverPassword from '~/features/account/components/RecoverPassword';

const Recover: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <PleaseLogin>
        <RecoverPassword />
      </PleaseLogin>
    </Container>
  );
};

export default Recover;

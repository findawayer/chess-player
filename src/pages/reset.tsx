import { Container } from '@material-ui/core';
import React from 'react';

import PleaseLogin from '~/components/PleaseLogin';
import ResetPassword from '~/features/account/components/ResetPassword';

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

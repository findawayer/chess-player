import { Container } from '@material-ui/core';
import React from 'react';

import AuthChecker from '~/features/account/containers/AuthChecker';
import ResetPassword from '~/features/account/components/ResetPassword';

const RecoverPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <AuthChecker>
        <ResetPassword />
      </AuthChecker>
    </Container>
  );
};

export default RecoverPage;

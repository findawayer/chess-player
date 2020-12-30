import React from 'react';
import { Container } from '@material-ui/core';

import Permissions from '~/features/admin/components/Permissions';
import PleaseLogin from '~/features/auth/components/PleaseLogin';

const Admin: React.FC = () => {
  return (
    <Container maxWidth="md">
      <PleaseLogin requiredRole="ADMIN">
        <Permissions />
      </PleaseLogin>
    </Container>
  );
};

export default Admin;

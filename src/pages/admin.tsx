import { Container } from '@material-ui/core';
import { Role } from '@prisma/client';
import React from 'react';

import PleaseLogin from '~/features/account/components/PleaseLogin';
import Permissions from '~/features/admin/components/Permissions';

const Admin: React.FC = () => {
  return (
    <Container maxWidth="md">
      <PleaseLogin requiredRole={Role.ADMIN}>
        <Permissions />
      </PleaseLogin>
    </Container>
  );
};

export default Admin;

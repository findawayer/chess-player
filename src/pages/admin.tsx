import { Container } from '@material-ui/core';
import { UserRole } from '@prisma/client';
import React from 'react';

import PleaseLogin from '~/components/PleaseLogin';
import Permissions from '~/features/admin/components/Permissions';

const Admin: React.FC = () => {
  return (
    <Container maxWidth="md">
      <PleaseLogin requiredRole={UserRole.ADMIN}>
        <Permissions />
      </PleaseLogin>
    </Container>
  );
};

export default Admin;

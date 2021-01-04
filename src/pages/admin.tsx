import { Container } from '@material-ui/core';
import { UserRole } from '@prisma/client';
import React from 'react';

import AuthChecker from '~/features/account/containers/AuthChecker';
import Permissions from '~/features/admin/components/Permissions';

const Admin: React.FC = () => {
  return (
    <Container maxWidth="md">
      <AuthChecker requiredRole={UserRole.ADMIN}>
        <Permissions />
      </AuthChecker>
    </Container>
  );
};

export default Admin;

import React from 'react';
import { Container } from '@material-ui/core';

import Permissions from '~/features/admin/components/Permissions';
import PleaseLogin from '~/features/account/components/PleaseLogin';
import { ADMIN_USER_ROLE } from '~/server/constants';

const Admin: React.FC = () => {
  return (
    <Container maxWidth="md">
      <PleaseLogin requiredRole={ADMIN_USER_ROLE}>
        <Permissions />
      </PleaseLogin>
    </Container>
  );
};

export default Admin;

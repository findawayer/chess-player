import { Container, Grid } from '@material-ui/core';
import React from 'react';

import { useUser } from '~/hooks';
import UpdatePassword from '~/features/account/components/UpdatePassword';
import UpdateUserInfo from '~/features/account/components/UpdateUserInfo';

const MyAccount: React.FC = () => {
  const me = useUser();

  return !me ? null : (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UpdateUserInfo me={me} />
        </Grid>
        <Grid item xs={12} md={6}>
          <UpdatePassword />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyAccount;

import { Container, Grid } from '@material-ui/core';
import React from 'react';

import { useUser } from '~app/hooks';
import UpdatePassword from '~app/features/account/components/UpdatePassword';
import UpdateUserInfo from '~app/features/account/components/UpdateUserInfo';

const MyAccount: React.FC = () => {
  /** Authenticated user paylaod extracted from React Context. */
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

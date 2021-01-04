import { Container, Grid } from '@material-ui/core';
import React from 'react';

import { CurrentUser } from '~/graphql';
import UpdatePassword from '~/features/account/components/UpdatePassword';
import UpdateUserInfo from '~/features/account/components/UpdateUserInfo';

interface MyAccountProps {
  me: CurrentUser;
}

const MyAccount: React.FC<MyAccountProps> = ({ me }) => {
  return (
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

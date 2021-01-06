import { Container, Grid } from '@material-ui/core';
// import { useRouter } from 'next/router';
import React from 'react';

import UpdatePassword from '~app/features/account/components/UpdatePassword';
import UpdateUserInfo from '~app/features/account/components/UpdateUserInfo';
import { useUser } from '~app/hooks';

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

import { Container } from '@material-ui/core';
import React from 'react';

import MyAccount from '~/features/account/containers/MyAccount';

const Account: React.FC = () => (
  <Container maxWidth="md">
    <MyAccount />
  </Container>
);

export default Account;

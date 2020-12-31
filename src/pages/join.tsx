import React from 'react';
import { Container } from '@material-ui/core';

import Join from '~/features/account/components/Join';

const JoinPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Join />
    </Container>
  );
};

export default JoinPage;

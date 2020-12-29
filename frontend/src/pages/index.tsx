import React from 'react';
import { Container } from '@material-ui/core';

import SelectGame from '~/features/chess/containers/SelectGame';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <SelectGame />
    </Container>
  );
};

export default Home;

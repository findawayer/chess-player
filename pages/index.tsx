import { Container } from '@material-ui/core';

import SelectGame from '~app/features/chess/containers/SelectGame';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <SelectGame />
    </Container>
  );
}

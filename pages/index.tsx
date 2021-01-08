import { Container } from '@material-ui/core';

import Layout from '~app/components/Layout';
import SelectGame from '~app/features/chess/containers/SelectGame';
import { UserProvider } from '~app/hooks';

export default function Index() {
  return (
    <UserProvider>
      <Layout>
        <Container maxWidth="sm">
          <SelectGame />
        </Container>
      </Layout>
    </UserProvider>
  );
}

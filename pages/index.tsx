import { Container } from '@material-ui/core';

import Layout from '~app/components/Layout';
import { UserProvider } from '~app/contexts/UserContext';
import SelectGame from '~app/features/chess/containers/SelectGame';

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

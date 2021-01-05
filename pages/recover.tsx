import { Container } from '@material-ui/core';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import { UserProvider } from '~app/contexts/UserContext';
import RecoverPassword from '~app/features/account/components/RecoverPassword';

export default function Recover() {
  return (
    <UserProvider>
      <Head>
        <title>Login | Chess Player</title>
      </Head>
      <Layout>
        <Container maxWidth="xs">
          <RecoverPassword />
        </Container>
      </Layout>
    </UserProvider>
  );
}

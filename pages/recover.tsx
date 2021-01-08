import { Container } from '@material-ui/core';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import RecoverPassword from '~app/features/account/components/RecoverPassword';
import { UserProvider } from '~app/hooks';

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

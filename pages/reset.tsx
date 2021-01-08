import { Container } from '@material-ui/core';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import ResetPassword from '~app/features/account/components/ResetPassword';
import { UserProvider } from '~app/hooks';

export default function RecoverLayout() {
  return (
    <UserProvider>
      <Head>
        <title>Login | Chess Player</title>
      </Head>
      <Layout>
        <Container maxWidth="xs">
          <ResetPassword />
        </Container>
      </Layout>
    </UserProvider>
  );
}

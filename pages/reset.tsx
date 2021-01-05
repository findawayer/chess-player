import { Container } from '@material-ui/core';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import { UserProvider } from '~app/contexts/UserContext';
import ResetPassword from '~app/features/account/components/ResetPassword';

export default function RecoverPage() {
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

import { Container } from '@material-ui/core';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import Signup from '~app/features/account/components/Signup';
import { UserProvider } from '~app/hooks';
import { getServerSession } from '~server/utils';

/** Redirect user from server side. This avoids flashing and should be more SEO friendly. */
export const getServerSideProps: GetServerSideProps = async context => {
  const me = await getServerSession(context.req);

  if (me) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function GetStarted() {
  return (
    <UserProvider>
      <Head>
        <title>Get started | Chess Player</title>
      </Head>
      <Layout>
        <Container maxWidth="xs">
          <Signup />
        </Container>
      </Layout>
    </UserProvider>
  );
}

import { Container } from '@material-ui/core';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import MyAccount from '~app/features/account/containers/MyAccount';
import { UserProvider } from '~app/hooks';
import { getServerSession } from '~server/utils';

/** Redirect user from server side. This avoids flashing and should be more SEO friendly. */
export const getServerSideProps: GetServerSideProps = async context => {
  const me = await getServerSession(context.req);

  if (!me) {
    return {
      redirect: {
        destination: '/',
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Account() {
  return (
    <UserProvider>
      <Head>
        <title>My account | Chess Player</title>
      </Head>
      <Layout>
        <Container maxWidth="md">
          <MyAccount />
        </Container>
      </Layout>
    </UserProvider>
  );
}

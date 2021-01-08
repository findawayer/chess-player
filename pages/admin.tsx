import { Container } from '@material-ui/core';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import Permissions from '~app/features/admin/components/Permissions';
import { UserProvider } from '~app/hooks';
import { isAdmin } from '~app/utils';
import { getServerSession } from '~server/utils';

/** Redirect user from server side. This avoids flashing and should be more SEO friendly. */
export const getServerSideProps: GetServerSideProps = async context => {
  const me = await getServerSession(context.req);

  if (!me || !isAdmin(me)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default function Admin() {
  return (
    <UserProvider>
      <Head>
        <title>Admin | Chess Player</title>
      </Head>
      <Layout>
        <Container maxWidth="md">
          <Permissions />
        </Container>
      </Layout>
    </UserProvider>
  );
}

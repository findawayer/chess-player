import { Container } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import { UserProvider } from '~app/contexts/UserContext';
import Permissions from '~app/features/admin/components/Permissions';
import { isAdmin } from '~app/utils';
import { getServerSession } from '~server/utils';

export const getServerSideProps: GetServerSideProps = async context => {
  const me = await getServerSession(context.req);

  if (!me || !isAdmin(me)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      me,
    },
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

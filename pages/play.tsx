import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Layout from '~app/components/Layout';
import { UserProvider } from '~app/contexts/UserContext';
import ChessGame from '~app/features/chess/containers/ChessGame';
import { getServerSession } from '~server/utils';

export const getServerSideProps: GetServerSideProps = async context => {
  const me = await getServerSession(context.req);

  return {
    props: {
      me,
    },
  };
};

export default function Play() {
  return (
    <UserProvider>
      <Head>
        <title>Play | Chess Player</title>
      </Head>
      <Layout>
        <ChessGame />
      </Layout>
    </UserProvider>
  );
}

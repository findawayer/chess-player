import Head from 'next/head';

import Layout from '~app/components/Layout';
import { UserProvider } from '~app/contexts/UserContext';
import ChessGame from '~app/features/chess/containers/ChessGame';

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

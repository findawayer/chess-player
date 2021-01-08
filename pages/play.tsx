import Head from 'next/head';

import Layout from '~app/components/Layout';
import ChessGame from '~app/features/chess/containers/ChessGame';
import { UserProvider } from '~app/hooks';

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

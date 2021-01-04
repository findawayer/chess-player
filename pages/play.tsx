import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ChessGame from '~app/features/chess/containers/ChessGame';
import { fetchCurrentUser } from '~app/graphql';

export const getServerSideProps: GetServerSideProps = async () => {
  const me = await fetchCurrentUser();

  return {
    props: {
      me,
    },
  };
};

export default function Play({
  me,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ChessGame me={me} />;
}

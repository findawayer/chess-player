import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

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

export default function Play({
  me,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ChessGame me={me} />;
}

import { Container } from '@material-ui/core';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import MyAccount from '~app/features/account/containers/MyAccount';
import { getServerSession } from '~server/utils';

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
    props: {
      me,
    },
  };
};

export default function Account({
  me,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container maxWidth="md">
      <MyAccount me={me} />
    </Container>
  );
}

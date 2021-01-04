import { Container } from '@material-ui/core';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import MyAccount from '~app/features/account/containers/MyAccount';
import { fetchCurrentUser } from '~app/graphql';

export const getServerSideProps: GetServerSideProps = async () => {
  const me = await fetchCurrentUser();

  if (!me) {
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

export default function Account({
  me,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container maxWidth="md">
      <MyAccount me={me} />
    </Container>
  );
}

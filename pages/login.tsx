import { Container } from '@material-ui/core';
import { GetServerSideProps } from 'next';

import Signin from '~app/features/account/components/Signin';
import { getServerSession } from '~server/utils';

export const getServerSideProps: GetServerSideProps = async context => {
  const me = await getServerSession(context.req);

  if (me) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      me,
    },
  };
};

export default function Login() {
  return (
    <Container maxWidth="xs">
      <Signin />
    </Container>
  );
}

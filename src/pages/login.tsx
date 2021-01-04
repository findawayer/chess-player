import { Container } from '@material-ui/core';
import { GetServerSideProps } from 'next';

import Signin from '~/features/account/components/Signin';
import { fetchCurrentUser } from '~/graphql';

export const getServerSideProps: GetServerSideProps = async () => {
  const me = await fetchCurrentUser();

  // Redirect auth user to landing page.
  if (me) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Login() {
  return (
    <Container maxWidth="xs">
      <Signin />
    </Container>
  );
}

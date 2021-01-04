import { Container } from '@material-ui/core';
import { UserRole } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import AuthChecker from '~app/features/account/containers/AuthChecker';
import Permissions from '~app/features/admin/components/Permissions';
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

export default function Admin({
  me,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container maxWidth="md">
      <AuthChecker me={me} requiredRole={UserRole.ADMIN}>
        <Permissions />
      </AuthChecker>
    </Container>
  );
}

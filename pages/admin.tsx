import { Container } from '@material-ui/core';
import { GetServerSideProps } from 'next';

import Permissions from '~app/features/admin/components/Permissions';
import { getServerSession } from '~server/utils';
import { isAdmin } from '~app/utils';

export const getServerSideProps: GetServerSideProps = async context => {
  const me = await getServerSession(context.req);

  if (!me || !isAdmin(me)) {
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

export default function Admin() {
  return (
    <Container maxWidth="md">
      <Permissions />
    </Container>
  );
}

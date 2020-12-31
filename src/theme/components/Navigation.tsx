import Link from 'next/link';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';

import LogoutButton from '~/features/account/components/LogoutButton';
import { CURRENT_USER_QUERY } from '~/features/account/graphql';

const Navigation: React.FC = () => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);
  // Fetching
  if (loading) return null;
  // Anon
  if (!data?.me) {
    return (
      <>
        <Link href="/join" passHref>
          <Button color="inherit">Join</Button>
        </Link>
        <Link href="/login" passHref>
          <Button color="inherit">Login</Button>
        </Link>
      </>
    );
  }
  // Logged in user
  return (
    <>
      <Link href="/account" passHref>
        <Button color="inherit">Account</Button>
      </Link>
      <LogoutButton />
    </>
  );
};

export default Navigation;

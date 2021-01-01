import { Button } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

import SignoutButton from '~/features/account/components/SignoutButton';
import { CurrentUser } from '~/graphql';

interface NavigationProps {
  me: CurrentUser;
}

const Navigation: React.FC<NavigationProps> = ({ me }) => {
  return me ? (
    // Logged in user
    <>
      <Link href="/join" passHref>
        <Button color="inherit">Join</Button>
      </Link>
      <Link href="/login" passHref>
        <Button color="inherit">Login</Button>
      </Link>
    </>
  ) : (
    // Anon
    <>
      <Link href="/account" passHref>
        <Button color="inherit">Account</Button>
      </Link>
      <SignoutButton />
    </>
  );
};

export default Navigation;

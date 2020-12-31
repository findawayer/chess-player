import Link from 'next/link';
import React from 'react';
import { Button } from '@material-ui/core';

import { useUser } from '~/features/account/hooks';

const AccountMenu: React.FC = () => {
  const me = useUser();
  return !me ? (
    // Anon
    <>
      <Link href="/join" passHref>
        <Button color="inherit">Join</Button>
      </Link>
      <Link href="/login" passHref>
        <Button color="inherit">Login</Button>
      </Link>
    </>
  ) : (
    // Logged in user
    <>
      <Link href="/account" passHref>
        <Button color="inherit">Account</Button>
      </Link>
      <Link href="/logout" passHref>
        <Button color="inherit">Logout</Button>
      </Link>
    </>
  );
};

export default AccountMenu;

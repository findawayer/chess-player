import { Button } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

import SignoutButton from '~app/features/account/components/SignoutButton';

interface AccountMenuProps {
  hasAuthUser: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ hasAuthUser }) => {
  return hasAuthUser ? (
    <>
      <Link href="/my-account" passHref>
        <Button color="inherit">Account</Button>
      </Link>
      <SignoutButton />
    </>
  ) : (
    <>
      <Link href="/get-started" passHref>
        <Button color="inherit">Join</Button>
      </Link>
      <Link href="/signin" passHref>
        <Button color="inherit">Login</Button>
      </Link>
    </>
  );
};

export default AccountMenu;

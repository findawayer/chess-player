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
      <Link href="/account" passHref>
        <Button color="inherit">Account</Button>
      </Link>
      <SignoutButton />
    </>
  ) : (
    <>
      <Link href="/join" passHref>
        <Button color="inherit">Join</Button>
      </Link>
      <Link href="/login" passHref>
        <Button color="inherit">Login</Button>
      </Link>
    </>
  );
};

export default AccountMenu;

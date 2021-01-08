import { Button } from '@material-ui/core';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import SignoutButton from '~app/features/account/components/SignoutButton';

interface AccountMenuProps {
  hasAuthUser: boolean;
}

const AccountMenu: FunctionComponent<AccountMenuProps> = ({ hasAuthUser }) => {
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
        <Button color="inherit">Get started</Button>
      </Link>
      <Link href="/signin" passHref>
        <Button color="inherit">Sign in</Button>
      </Link>
    </>
  );
};

export default AccountMenu;

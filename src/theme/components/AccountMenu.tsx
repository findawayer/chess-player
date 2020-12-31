import React from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';

import { CURRENT_USER_QUERY } from '~/features/auth/graphql';

const AccountMenu: React.FC = () => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);
  // Fetching
  if (loading) return null;
  // Anon
  if (!data?.me) {
    return (
      <>
        <Button color="inherit" href="/join">
          Join
        </Button>
        <Button color="inherit" href="/login">
          Login
        </Button>
      </>
    );
  }
  // Logged in user
  return (
    <>
      <Button color="inherit" href="/account">
        My account
      </Button>
      <Button color="inherit" href="/logout">
        Logout
      </Button>
    </>
  );
};

export default AccountMenu;

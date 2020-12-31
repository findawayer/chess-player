import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';

import { CURRENT_USER_QUERY, SIGN_OUT_MUTATION } from '../graphql';

/** Logout button */
const LogoutButton: React.FC = () => {
  const [signout, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  /** Handler for clicking the logout button. */
  const handleClick = async () => {
    try {
      await signout();
    } catch (error) {
      return;
    }
    // Redirect to home
    router.push('/');
  };
  return loading ? null : (
    <Button color="inherit" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;

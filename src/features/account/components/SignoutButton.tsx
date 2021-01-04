import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

import { SIGN_OUT_MUTATION, Signout } from '~/features/account/graphql';
import { CURRENT_USER_QUERY } from '~/graphql';

interface SignoutButtonProps {
  noRedirect?: boolean;
}

const SignoutButton: React.FC<SignoutButtonProps> = ({ noRedirect }) => {
  const [signout, { loading }] = useMutation<Signout>(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  /** Handler for clicking the logout button. */
  const handleClick = async () => {
    try {
      // Invoke signout action.
      await signout();
      // Redirect to home, if succssful.
      if (!noRedirect) {
        router.push('/');
      }
    } catch (error) {
      // Don't display error to the user.
    }
  };
  return loading ? null : (
    <Button color="inherit" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default SignoutButton;

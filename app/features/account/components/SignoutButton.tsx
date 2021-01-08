import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import type { FunctionComponent } from 'react';

import { SIGN_OUT_MUTATION, Signout } from '~app/features/account/graphql';
import { CURRENT_USER_QUERY } from '~app/graphql';

const SignoutButton: FunctionComponent = () => {
  const [signout, { loading }] = useMutation<Signout>(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  /** Handler for clicking the logout button. */
  const handleClick = async () => {
    try {
      // Invoke signout action.
      await signout();
      // Redirect to login page, if succssful.
      router.push('/signin');
    } catch (error) {
      // Don't display error to the user.
    }
  };

  return (
    <Button color="inherit" disabled={loading} onClick={handleClick}>
      Sign out
    </Button>
  );
};

export default SignoutButton;

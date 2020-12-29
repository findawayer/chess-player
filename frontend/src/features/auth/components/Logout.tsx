import { useRouter } from 'next/router';
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';

import { CURRENT_USER_QUERY } from '../queries/user';

const SIGN_OUT_MUTATION = gql`
  mutation SignOutMutation {
    signout {
      id
    }
  }
`;

const Logout: React.FC = () => {
  const [signout, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      return;
    }
    // Redirect to home
    router.push('/');
  };
  // Render as a button
  return loading ? null : (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;

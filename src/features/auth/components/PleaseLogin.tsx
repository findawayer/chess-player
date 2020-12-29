import Link from 'next/link';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { CURRENT_USER_QUERY } from '../queries/user';
import { hasPermissions } from '~/helpers/permissions';
import { UserPayload, UserRole } from '~/types';

interface PleaseLoginProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

/**
 * Prevent anon users from a certain page or content. Wrap the content
 * with this component.
 *
 * @example
 *   <PleaseLogin>
 *     <Admin />
 *   </PleaseLogin>

 *   <PleaseLogin>
 *     Any React node can be passed as child node.
 *   </PleaseLogin>
 */
const PleaseLogin: React.FC<PleaseLoginProps> = ({
  children,
  requiredRole,
}) => {
  const { loading, data } = useQuery<{ me: UserPayload } | null>(
    CURRENT_USER_QUERY,
  );

  // Loading...
  if (loading) {
    return <CircularProgress />;
  }
  // Not logged in!
  if (!data?.me) {
    return (
      <Box textAlign="center">
        <Typography variant="h2">Please log in before continuing.</Typography>
        <Box mt={5}>
          <Link href="/join" passHref>
            <Button variant="contained" color="primary" size="large">
              Join
            </Button>
          </Link>
          &nbsp;&nbsp;
          <Link href="/login" passHref>
            <Button variant="contained" color="primary" size="large">
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }
  // Specific permissions are required and current user does not have it.
  if (requiredRole && !hasPermissions(data.me, requiredRole)) {
    return (
      <Alert severity="error" variant="filled">
        You do not have enough permissions to access this page.
      </Alert>
    );
  }
  return <>{children}</>;
};

export default PleaseLogin;

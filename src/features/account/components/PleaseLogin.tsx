import { Box, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import type { Role } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

import { useUser } from '~/hooks/useUser';
import { hasRole } from '~/utils/roles';

interface PleaseLoginProps {
  children: React.ReactNode;
  requiredRole?: Role;
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
  const me = useUser();
  // Not logged in!
  if (!me) {
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
  if (requiredRole && !hasRole(me, requiredRole)) {
    return (
      <Alert severity="error" variant="filled">
        You do not have enough permissions to access this page.
      </Alert>
    );
  }
  return <>{children}</>;
};

export default PleaseLogin;

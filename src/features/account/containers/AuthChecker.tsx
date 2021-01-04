import { Alert } from '@material-ui/lab';
import type { UserRole } from '@prisma/client';
import React from 'react';

import { useUser } from '~/hooks/useUser';
import { hasRole } from '~/utils/roles';
import PleaseSignin from '~/features/account/components/PleaseSignin';
import PleaseSigninInline from '~/features/account/components/PleaseSigninInline';

interface PleaseLoginProps {
  children: React.ReactNode;
  inline?: boolean;
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
  inline,
  requiredRole,
}) => {
  const me = useUser();
  // Not logged in!
  if (!me) {
    return inline ? <PleaseSigninInline /> : <PleaseSignin />;
  }
  // User is missing required role.
  if (requiredRole && !hasRole(me, requiredRole)) {
    return (
      <Alert severity="error" variant="filled">
        You do not have access to this page.
      </Alert>
    );
  }
  // Good to go :)
  return <>{children}</>;
};

export default PleaseLogin;

import { Alert } from '@material-ui/lab';
import type { FunctionComponent, ReactNode } from 'react';

import PleaseSignin from '~app/features/account/components/PleaseSignin';
import PleaseSigninInline from '~app/features/account/components/PleaseSigninInline';
import { useUser } from '~app/hooks/useUser';
import { isAdmin } from '~app/utils/roles';

interface AuthCheckerProps {
  children: ReactNode;
  inline?: boolean;
  requireAdmin?: boolean;
}

/**
 * Prevent anon users from a certain page or content. Wrap the content
 * with this component.
 *
 * @example
 *   <AuthChecker>
 *     <Admin />
 *   </AuthChecker>

 *   <AuthChecker>
 *     Any React node can be passed as child node.
 *   </AuthChecker>
 */
const AuthChecker: FunctionComponent<AuthCheckerProps> = ({
  children,
  inline,
  requireAdmin,
}) => {
  const me = useUser();
  // Not logged in!
  if (!me) {
    return inline ? <PleaseSigninInline /> : <PleaseSignin />;
  }
  // User is missing required role.
  if (requireAdmin && !isAdmin(me)) {
    return (
      <Alert severity="error" variant="filled">
        You do not have access to this page.
      </Alert>
    );
  }
  // Good to go :)
  return <>{children}</>;
};

export default AuthChecker;

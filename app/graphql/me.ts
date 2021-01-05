import { gql } from '@apollo/client';
import type { User } from '@prisma/client';

import { initializeApollo } from '~app/vendors/apollo-client';

/**
 * GraphQL: Fetch current user, to reflect the user data to the view.
 */
export const CURRENT_USER_QUERY = gql`
  query me {
    me {
      email
      name
      role
      colorMode
      chessAutoQueen
      chessBoardColor
      chessShowLegal
      chessShowRecent
    }
  }
`;

/**
 * User payload that GraphQL queries fetching the currently authenticated user should return.
 */
export type CurrentUser = Pick<
  User,
  | 'email'
  | 'name'
  | 'role'
  | 'colorMode'
  | 'chessAutoQueen'
  | 'chessBoardColor'
  | 'chessShowLegal'
  | 'chessShowRecent'
>;

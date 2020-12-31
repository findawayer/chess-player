import { gql } from '@apollo/client';

/** GraphQL: Fetch current user, to reflect the user data to the view. */
export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    me {
      id
      email
      name
      role
    }
  }
`;

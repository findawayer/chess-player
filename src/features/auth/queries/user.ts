import { gql } from '@apollo/client';

/** Fetch current user, to reflect the user data to the view. */
export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      role
    }
  }
`;

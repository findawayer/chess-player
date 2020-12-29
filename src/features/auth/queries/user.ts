import { gql } from '@apollo/client';

/** Fetch current user, to reflect the user data to the view. */
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

export const ALL_USERS_QUERY = gql`
  query AllUsers {
    users {
      id
      email
      name
      role
    }
  }
`;

import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      email
      name
      role
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    users {
      id
      email
      name
      permissions
    }
  }
`;

import { gql } from '@apollo/client';

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

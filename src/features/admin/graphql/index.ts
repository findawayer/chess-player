import { gql } from '@apollo/client';

/** GraphQL: Get users per page. (offset-based) */
export const USERS_BY_PAGE_QUERY = gql`
  query UsersByPageQuery($take: Int, $skip: Int = 0) {
    users(take: $take, skip: $skip) {
      id
      email
      name
      verified
      role
    }
  }
`;

/** GraphQL: Update user's role. */
export const UPDATE_USER_ROLE_MUTATION = gql`
  mutation updateUserRole($id: ID!, $role: Role!) {
    updateUserRole(id: $id, role: $role) {
      id
      role
    }
  }
`;

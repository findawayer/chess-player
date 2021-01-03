import { gql } from '@apollo/client';
import type { User, UserRole } from '@prisma/client';

/** GraphQL: Get users per page. (offset-based) */
// TODO: move `users`
export const USERS_QUERY = gql`
  query users($take: Int, $skip: Int = 0) {
    users(take: $take, skip: $skip) {
      id
      email
      name
      verified
      role
    }
  }
`;

export type PaginatedUser = Pick<
  User,
  'id' | 'email' | 'name' | 'verified' | 'role'
>;

/** GraphQL: Update user's role. */
export const UPDATE_USER_ROLE_MUTATION = gql`
  mutation updateUserRole($role: Role!) {
    updateUserRole(role: $role) {
      id
    }
  }
`;

export type UpdateUserRole = (id: string, role: UserRole) => void;

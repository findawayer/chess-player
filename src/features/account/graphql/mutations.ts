import { gql } from '@apollo/client';

/** GraphQL: Sign up user then login. */
export const SIGN_UP_MUTATION = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(data: { email: $email, name: $name, password: $password }) {
      id
    }
    signin(email: $email, password: $password) {
      id
    }
  }
`;

/** GraphQL: Sign in user. */
export const SIGN_IN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

/** GraphQL: Sign out user. */
export const SIGN_OUT_MUTATION = gql`
  mutation SignOutMutation {
    signout {
      id
    }
  }
`;

/** GraphQL: Request password reset. */
export const RECOVER_PASSWORD_MUTATION = gql`
  mutation RecoverPassword($email: String!) {
    recoverPassword(email: $email) {
      id
    }
  }
`;

/** GraphQL: Assign a new password. */
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

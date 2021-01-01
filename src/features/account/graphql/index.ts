import { gql } from '@apollo/client';

/** GraphQL: Sign up user then login. */
export const SIGN_UP_MUTATION = gql`
  mutation signup($email: String!, $name: String!, $password: String!) {
    signup(data: { email: $email, name: $name, password: $password }) {
      id
    }
    signin(email: $email, password: $password) {
      id
    }
  }
`;

// Returned `signup` method.
export type Signup = ({
  data,
}: {
  data: { email: string; name: string; password: string };
}) => void;

/** GraphQL: Sign in user. */
export const SIGN_IN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

// Returned `signin` method.
export type Signin = (email: string, password: string) => void;

/** GraphQL: Sign out user. */
export const SIGN_OUT_MUTATION = gql`
  mutation signOutMutation {
    signout {
      id
    }
  }
`;

// Returned `signout` method.
export type Signout = () => void;

/** GraphQL: Request password reset. */
export const RECOVER_PASSWORD_MUTATION = gql`
  mutation recoverPassword($email: String!) {
    recoverPassword(email: $email) {
      id
    }
  }
`;

// Returned `recoverPassword` method.
export type RecoverPassword = (email: string) => void;

/** GraphQL: Assign a new password. */
export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
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

// Returned `resetPassword` method.
export type ResetPassword = (
  resetToken: string,
  password: string,
  confirmPassword: string,
) => void;

/** GraphQL: Update user data */
export const UPDATE_USER_INFO_MUTATION = gql`
  mutation updateUserInfo($id: Int!, $email: String!, $name: String!) {
    updateUserInfo(id: $id, email: $email, name: $name) {
      id
    }
  }
`;

// Returned `updateUserInfo` method.
export type UpdateUserInfo = (id: number, email: string, name: string) => void;

/** GraphQL: Update user data */
export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword(
    $oldPassword: String!
    $password: String!
    $confirmPassword: String!
  ) {
    updatePassword(
      oldPassword: $oldPassword
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

// Returned `updatePassword` method.
export type UpdatePassword = (
  oldPassword: string,
  password: string,
  confirmPassword: string,
) => void;

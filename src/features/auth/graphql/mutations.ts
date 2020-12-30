import { gql } from '@apollo/client';

// GraphQL mutation: signup then login
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

// GraphQL mutation: signup
export const SIGN_IN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

export const SIGN_OUT_MUTATION = gql`
  mutation SignOutMutation {
    signout {
      id
    }
  }
`;

export const RECOVER_PASSWORD_MUTATION = gql`
  mutation RecoverPassword($email: String!) {
    recoverPassword(email: $email) {
      id
    }
  }
`;

// GraphQL mutation: signup then login
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

import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-micro';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';

import { canAccessAdmin } from '~/utils';
import { Context } from '../context/graphql-context';
import { AuthUser, User, UserAccessPayload } from '../typedefs/users';

/** Retrieve current user's access payload if they are logged in, otherwise throw. */
export const requireAuth = (context: Context): UserAccessPayload | never => {
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in.');
  }
  return context.user;
};

export const requireValidPassword = async (
  enteredPassword: string,
  correctPassword: string,
): Promise<void | never> => {
  // Runtime double-check for empty password.
  if (!enteredPassword) {
    throw new UserInputError(`Please provide password.`);
  }
  // Check if the password is correct.
  const passwordIsValid = await bcrypt.compare(
    enteredPassword,
    correctPassword,
  );
  // Incorrect password received.
  if (!passwordIsValid) {
    throw new UserInputError(`Invalid password!`);
  }
};

/** Throw if the passed user is not an admin. */
export const requireAdmin = (user: AuthUser): void | never => {
  if (!canAccessAdmin(user)) {
    throw new ForbiddenError('You need relevant permissions.');
  }
};

/** Normalize user's email input, throw if bad its not an email. */
export const requireValidEmail = (emailInput: string): string | never => {
  // Normalize email
  const email = emailInput.trim().toLowerCase();
  // Validate email pattern
  if (!isEmail(email)) {
    throw new UserInputError('Invalid email input.');
  }
  return email;
};

export const requireValidUser = async (
  email: string,
  context: Context,
): Promise<User | never> => {
  const user = await context.prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new ApolloError(`No such user found for ${email}.`);
  }
  return user;
};

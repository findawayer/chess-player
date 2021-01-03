import type { User } from '@prisma/client';
import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from 'apollo-server-micro';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';

import { AuthUserPayload, GraphQLContext } from '~/server/interfaces';
import { prisma } from '~/server/prisma';

/** Retrieve current user's access payload if they are logged in, otherwise throw. */
export const requireAuth = (
  context: GraphQLContext,
): AuthUserPayload | never => {
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in.');
  }
  return context.user;
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

/** Make sure user entered password matches encrypted password. */
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

/** Throw if the provided passwords match. */
export const requirePasswordsMatch = (
  password: string,
  confirmPassword: string,
): void | never => {
  if (password !== confirmPassword) {
    throw new UserInputError(`Your passwords don't match.`);
  }
};

/** Find user by email, and throw if not found.  */
export const requireValidUser = async (
  email: string,
): Promise<User | never> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new ApolloError(`No such user found for ${email}.`);
  }
  return user;
};
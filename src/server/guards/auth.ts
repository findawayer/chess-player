import type { User } from '@prisma/client';
import { ApolloError, UserInputError } from 'apollo-server-micro';
import bcrypt from 'bcryptjs';

import { prisma } from '~/server/prisma';

/** Returns `enteredPassword` as is, if it matches previously encrypted password. */
export const requireValidPassword = async (
  enteredPassword: string,
  correctPassword: string,
): Promise<string | never> => {
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
  return enteredPassword;
};

/** Returns true if the passed `password` & `confirmPassword` match. */
export const requirePasswordsMatch = (
  password: string,
  confirmPassword: string,
): true | never => {
  if (password !== confirmPassword) {
    throw new UserInputError(`Your passwords don't match.`);
  }
  return true;
};

/** Returns the user matching the passed email, if existent.  */
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

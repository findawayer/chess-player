import { ApolloError } from 'apollo-server-micro';
import {
  arg,
  booleanArg,
  intArg,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from 'nexus';

import {
  requireAdmin,
  requireAuth,
  requirePasswordsMatch,
  requireValidEmail,
  requireValidPassword,
  requireValidUser,
} from '../guards/auth';
import { sendRecoveryEmail } from '../mailing/recovery';
import {
  createPasswordResetToken,
  handleSuccessfulLogin,
  handleSuccessfulLogout,
  hashPassword,
} from '../utils';

/* ========== Type: User  ========== */
export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
    t.model.role();
    t.model.verified();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.resetToken();
    t.model.resetTokenExpiry();
    t.model.chessAutoQueen();
    t.model.chessBoardColor();
    t.model.chessShowLegal();
    t.model.chessShowRecent();
    t.model.colorMode();
  },
});

/* ========== Query: User  ========== */
export const UserQuery = queryType({
  definition(t) {
    // ---------- user ---------- //
    t.crud.user();
    // ---------- users ---------- //
    t.list.field('users', {
      type: User,
      args: {
        take: nonNull(intArg()),
        skip: intArg(),
      },
      // Cursor based pagination
      async resolve(_root, { take, skip = 0 }, context) {
        const users = await context.prisma.user.findMany({
          take,
          skip,
          orderBy: { createdAt: 'desc' },
        });
        return users;
      },
    });
    // ---------- allUsers ---------- //
    t.crud.users({
      alias: 'allUsers',
      filtering: true,
      ordering: true,
      pagination: true,
    });
    // ---------- me ---------- //
    t.field('me', {
      type: User,
      nullable: true,
      async resolve(_root, _args, context) {
        if (!context.user) {
          return null;
        }
        const me = await context.prisma.user.findUnique({
          where: { id: context.user.id },
        });
        return me;
      },
    });
  },
});

/* ========== Mutation: User  ========== */
export const UserMutation = mutationType({
  definition(t) {
    // ---------- signup ---------- //
    t.crud.createOneUser({
      alias: 'signup',
      async resolve(root, { data }, context, info, originalResolve) {
        // Normalize email and validate it.
        const email = requireValidEmail(data.email);
        // Check if there is a user with that email.
        const existingUser = await context.prisma.user.findUnique({
          where: { email },
        });
        if (existingUser) {
          throw new ApolloError('Email already in use.');
        }
        // Hash the password.
        const password = await hashPassword(data.password);
        // Create the user.
        return originalResolve(
          root,
          {
            data: {
              ...data,
              email,
              password,
              role: 'MEMBER',
            },
          },
          context,
          info,
        );
      },
    });
    // ---------- signin ---------- //
    t.field('signin', {
      type: User,
      nullable: false,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, { email, password }, context) {
        // Check if there is a user with that email.
        const user = await requireValidUser(email, context);
        // Check if the password is correct.
        await requireValidPassword(password, user.password);
        // Set the user logged in.
        await handleSuccessfulLogin(user, context.res);
        // Return the user.
        return user;
      },
    });
    // ---------- signout ---------- //
    // TODO: the return type is not user, null.
    // Find the right nexus syntax and update it.
    t.field('signout', {
      type: User,
      nullable: true,
      resolve: async (_root, _args, { res }) => {
        // Remove user login token from cookie.
        await handleSuccessfulLogout(res);
        // Return nothing.
        return null;
      },
    });
    // ---------- deleteUser ---------- //
    t.crud.deleteOneUser({ alias: 'deleteUser' });
    // ---------- recoverPassword ---------- //
    t.string('recoverPassword', {
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_root, { email }, context) {
        // Check if there is a user with that email.
        const user = await requireValidUser(email, context);
        // Set a reset token and expiry on that user
        const {
          token: resetToken,
          expires: resetTokenExpiry,
        } = await createPasswordResetToken();

        await context.prisma.user.update({
          where: { email },
          data: { resetToken, resetTokenExpiry },
        });
        // Email them the reset token.
        await sendRecoveryEmail({
          to: user.email,
          resetToken,
        });
        // Nothing is returned.
        return null;
      },
    });
    // ---------- resetPassword ---------- //
    t.field('resetPassword', {
      type: User,
      args: {
        resetToken: nonNull(stringArg()),
        password: nonNull(stringArg()),
        confirmPassword: nonNull(stringArg()),
      },
      async resolve(_root, { resetToken, password, confirmPassword }, context) {
        // Make sure the passwords match.
        requirePasswordsMatch(password, confirmPassword);
        // Find out the reset token is valid.
        const user = await context.prisma.user.findFirst({
          where: {
            resetToken,
            resetTokenExpiry: {
              gte: Date.now(),
            },
          },
        });
        if (!user) {
          throw new ApolloError('This token is either invalid or expired.');
        }
        // Hash their new password
        const newPassword = await hashPassword(password);
        // Save the new password to the user and remove resetToken fields.
        const updatedUser = await context.prisma.user.update({
          where: { email: user.email },
          data: {
            password: newPassword,
            resetToken: null,
            resetTokenExpiry: null,
          },
        });
        // Set the user logged in.
        await handleSuccessfulLogin(user, context.res);
        // Return the user.
        return updatedUser;
      },
    });
    // ---------- updateUserInfo ---------- //
    t.field('updateUserInfo', {
      type: User,
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_root, { email, name }, context) {
        // Make sure they are logged in.
        const { id } = requireAuth(context);
        // await requireValidPassword(password, user.password);
        // Find requested user and update permissions.
        return context.prisma.user.update({
          where: { id },
          data: { email, name },
        });
      },
    });
    // ---------- updatePassword ---------- //
    t.field('updatePassword', {
      type: User,
      args: {
        oldPassword: nonNull(stringArg()),
        password: nonNull(stringArg()),
        confirmPassword: nonNull(stringArg()),
      },
      async resolve(
        _root,
        { oldPassword, password, confirmPassword },
        context,
      ) {
        // Make sure they are logged in.
        const { id } = requireAuth(context);
        // Make sure the passwords match.
        requirePasswordsMatch(password, confirmPassword);
        // Check if the password is correct.
        const user = await context.prisma.user.findUnique({
          where: { id },
        });
        // Check if the old password is correct.
        await requireValidPassword(oldPassword, user.password);
        // Hash the new password.
        const hashedPassword = await hashPassword(password);
        // await requireValidPassword(password, user.password);
        // Find requested user and update permissions.
        return context.prisma.user.update({
          where: { id },
          data: { password: hashedPassword },
        });
      },
    });
    // ---------- updateUserRole ---------- //
    t.field('updateUserRole', {
      type: User,
      args: {
        id: nonNull(intArg()),
        role: nonNull(arg({ type: 'Role' })),
      },
      async resolve(_root, { id, role }, context) {
        // Make sure they are logged in.
        requireAuth(context);
        // Check if the requestor has right permissions.
        const currentUser = await context.prisma.user.findUnique({
          where: { id },
        });
        requireAdmin(currentUser);
        // Find requested user and update permissions.
        return context.prisma.user.update({
          where: { id },
          data: { role },
        });
      },
    });
    // ---------- setColorMode ---------- //
    t.field('setColorMode', {
      type: User,
      args: {
        colorMode: nonNull(arg({ type: 'ColorMode' })),
      },
      async resolve(_root, { colorMode }, context) {
        // Make sure they are logged in.
        const { id } = requireAuth(context);
        // Check if the requestor has right permissions.
        return context.prisma.user.update({
          where: { id },
          data: { colorMode },
        });
      },
    });
    // ---------- updateChessSettings ---------- //
    t.field('updateChessSettings', {
      type: User,
      args: {
        chessAutoQueen: nonNull(booleanArg()),
        chessBoardColor: nonNull(arg({ type: 'ChessBoardColor' })),
        chessShowLegal: nonNull(booleanArg()),
        chessShowRecent: nonNull(booleanArg()),
      },
      async resolve(
        _root,
        { chessAutoQueen, chessBoardColor, chessShowLegal, chessShowRecent },
        context,
      ) {
        // Make sure they are logged in.
        const { id } = requireAuth(context);
        // Check if the requestor has right permissions.
        return context.prisma.user.update({
          where: { id },
          data: {
            chessAutoQueen,
            chessBoardColor,
            chessShowLegal,
            chessShowRecent,
          },
        });
      },
    });
  },
});

import { ApolloError, UserInputError } from 'apollo-server-micro';
import {
  arg,
  intArg,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from 'nexus';

// Load aliases map BEFORE local imports,
import '../../utils/applyModuleAliases';
// and the local imports works.
import {
  requireAdmin,
  requireAuth,
  requireValidEmail,
  requireValidPassword,
  requireValidUser,
} from '~/server/guards/auth';
import { sendRecoveryEmail } from '~/server/mailing/recovery';
import {
  createPasswordResetToken,
  hashPassword,
  handleSuccessfulLogin,
  handleSuccessfulLogout,
} from '~/server/utils';

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
        // Create the user in the database.
        const user = await originalResolve(
          root,
          {
            data: {
              ...data,
              email,
              password,
              role: 'USER',
            },
          },
          context,
          info,
        );
        // Return the user.
        return user;
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
        // Check if the passwords match.
        if (password !== confirmPassword) {
          throw new UserInputError(`Your passwords don't match.`);
        }
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
    // ---------- updatePermissions ---------- //
    t.field('updateUserRole', {
      type: User,
      args: {
        id: nonNull(intArg()),
        role: nonNull(arg({ type: 'Role' })),
      },
      async resolve(_root, { id, role }, context) {
        // Make sure they are logged in.
        const currentUser = requireAuth(context);
        // Check if the requestor has right permissions.
        const requestor = await context.prisma.user.findUnique({
          where: { id: currentUser.id },
        });
        requireAdmin(requestor);
        // Find requested user and update permissions.
        return context.prisma.user.update({
          where: { id },
          data: { role },
        });
      },
    });
  },
});

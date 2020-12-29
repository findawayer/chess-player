import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import {
  arg,
  idArg,
  intArg,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from 'nexus';
import { promisify } from 'util';
import isEmail from 'validator/lib/isEmail';

// Load aliases map BEFORE local imports.
import '../../helpers/module-alias';
// Then the local imports.
import { hasPermissions } from '~/helpers/users';
import { createRecoveryEmail, transport } from '~/mails';

/** Factor passed to hashing algorithm to make the encrypted output unique. */
const SALT_ROUNDS = 10;

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
        if (!context.userId) {
          return null;
        }
        const me = await context.prisma.user.findUnique({
          where: { id: context.userId },
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
        // Normalize email
        const email = data.email.trim().toLowerCase();
        // Validate email pattern
        if (!isEmail(email)) {
          throw new Error('Invalid email input.');
        }
        // Check if there is a user with that email.
        const existingUser = await context.prisma.user.findUnique({
          where: { email },
        });
        if (existingUser) {
          throw new Error('Email already in use.');
        }
        // Hash the password.
        const password = await bcrypt.hash(data.password, SALT_ROUNDS);
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
        const user = await context.prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error(`No such user found for email ${email}.`);
        }
        // Check if the password is correct.
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
          throw new Error(`Invalid password!`);
        }
        // Genrate a JWT token.
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // Set the cookie with the token.
        context.res.cookie('accessToken', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        });
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
      resolve: (_root, _args, { res }) => {
        // Remove user login token from cookie.
        res.clearCookie('accessToken');
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
        const user = await context.prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error(`No such user found for email ${email}.`);
        }
        // Set a reset token and expiry on that user
        const promisifiedRandomBytes = promisify(crypto.randomBytes);
        // (It's better to run every module asynchronously for just in case)
        const resetToken = (await promisifiedRandomBytes(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
        await context.prisma.user.update({
          where: { email },
          data: { resetToken, resetTokenExpiry },
        });
        // Email them the reset token.
        const { title, body } = createRecoveryEmail({ resetToken });
        await transport.sendMail({
          from: process.env.MAIL_SENDER,
          to: user.email,
          subject: title,
          html: body,
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
          throw new Error(`Your passwords don't match.`);
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
          throw new Error('This token is either invalid or expired.');
        }
        // Hash their new password
        const newPassword = await bcrypt.hash(password, 10);
        // Save the new password to the user and remove resetToken fields.
        const updatedUser = await context.prisma.user.update({
          where: { email: user.email },
          data: {
            password: newPassword,
            resetToken: null,
            resetTokenExpiry: null,
          },
        });
        // Genrate a JWT token.
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // Set the cookie with the token.
        context.res.cookie('accessToken', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        // Return the user.
        return updatedUser;
      },
    });
    // ---------- updatePermissions ---------- //
    t.field('updateUserRole', {
      type: User,
      args: {
        id: nonNull(idArg()),
        role: nonNull(arg({ type: 'Role' })),
      },
      async resolve(_root, { id, role }, context) {
        // Make sure they are logged in.
        if (!context.userId) {
          throw new Error('You must be logged in.');
        }
        // Check if the requestor has right permissions.
        const requestor = await context.prisma.user.findUnique({
          where: { id: context.userId },
        });
        // Prevent them from assigning higher permissions than their current ones.
        if (!hasPermissions(requestor, role)) {
          throw new Error(`You don't have sufficient permissions.`);
        }
        // Find requested user and update permissions.
        return context.prisma.user.update({
          where: { id },
          data: { role },
        });
      },
    });
  },
});

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { mutationType, objectType, queryType, stringArg } from 'nexus';
import { promisify } from 'util';

// Load aliases map BEFORE local imports.
import '../../moduleAlias';
// Then the local imports.
import environment from '~/server/environment';
import { createRecoveryEmail, transport } from '~/server/emails';

/* ========== Type: User  ========== */
export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
    t.model.role();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

/* ========== Query: User  ========== */
export const UserQuery = queryType({
  definition(t) {
    // ---------- user ---------- //
    t.crud.user();
    // ---------- users ---------- //
    t.crud.users();
    // ---------- me ---------- //
    t.field('me', {
      type: User,
      nullable: true,
      resolve: (_root, _args, context) => {
        if (!context.userId) {
          return null;
        }
        return context.prisma.user.findUnique({
          where: { id: parseInt(context.userId, 10) },
        });
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
        // 1. Normalize email
        const email = data.email.trim().toLowerCase();
        // 2. Hash the password — pass hashing algorithm as 2nd argument
        //    to make the output hash unique across platforms.
        const password = await bcrypt.hash(data.password, 10);
        // 3. Create the user in the database.
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
        // // 4. Create JWT token for this request.
        // const token = jwt.sign({ userId: user.id }, environment.app.secret);
        // // 5. Set the JWT token as a cookie on the response.
        // context.res.cookie('accessToken', token, {
        //   httpOnly: true,
        //   maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        // });
        // 6. Return the user.
        return user;
      },
    });
    // ---------- signin ---------- //
    t.field('signin', {
      type: User,
      nullable: false,
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      async resolve(_root, { email, password }, context) {
        // 1. Check if there is a user with that email.
        const user = await context.prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error(`No such user found for email ${email}.`);
        }
        // 2. Check if the password is correct.
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
          throw new Error(`Invalid password!`);
        }
        // 3. Genrate a JWT token.
        const token = jwt.sign({ userId: user.id }, environment.app.secret);
        // 4. Set the cookie with the token.
        context.res.cookie('accessToken', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        });
        // 5. Return the user.
        return user;
      },
    });
    // ---------- signout ---------- //
    t.field('signout', {
      type: User,
      resolve: (_root, _args, { res }) => {
        // 1. Remove user login token from cookie.
        res.clearCookie('accessToken');
        // 2. Return true as success flag.
        return null;
      },
    });
    // ---------- deleteUser ---------- //
    t.crud.deleteOneUser({ alias: 'deleteUser' });
    // ---------- recoverPassword ---------- //
    t.field('recoverPassword', {
      type: User,
      args: {
        email: stringArg(),
      },
      async resolve(_root, { email }, context) {
        // 1. Check if there is a user with that email.
        const user = await context.prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error(`No such user found for email ${email}.`);
        }
        // 1. Set a reset token and expiry on that user
        const promisifiedRandomBytes = promisify(crypto.randomBytes);
        // (It's better to run every module asynchronously for just in case)
        const resetToken = (await promisifiedRandomBytes(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
        await context.prisma.user.update({
          where: { email },
          data: { resetToken, resetTokenExpiry },
        });
        // 3. Email them the reset token.
        const { title, body } = createRecoveryEmail({ resetToken });
        await transport.sendMail({
          from: environment.mail.sender,
          to: user.email,
          subject: title,
          html: body,
        });
        // 2. Return true as success flag.
        return null;
      },
    });
    // ---------- resetPassword ---------- //
    t.field('resetPassword', {
      type: User,
      args: {
        resetToken: stringArg(),
        password: stringArg(),
        confirmPassword: stringArg(),
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
        // 4. Hash their new password
        const newPassword = await bcrypt.hash(password, 10);
        // 5. Save the new password to the user and remove resetToken fields.
        const updatedUser = await context.prisma.user.update({
          where: { email: user.email },
          data: {
            password: newPassword,
            resetToken: null,
            resetTokenExpiry: null,
          },
        });
        // 3. Genrate a JWT token.
        const token = jwt.sign({ userId: user.id }, environment.app.secret);
        // 4. Set the cookie with the token.
        context.res.cookie('accessToken', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        // 5. Return the user.
        return updatedUser;
      },
    });
  },
});

import { ApolloError } from 'apollo-server-micro';
import { Arg, Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { Context } from '~server/decorators/Context';
import {
  requirePasswordsMatch,
  requireUserByEmail,
  requireUserById,
  requireValidPassword,
} from '~server/guards';
import { GraphQLContext } from '~server/interfaces';
import { sendRecoveryEmail } from '~server/mailing/recovery';
import { prisma } from '~server/prisma';
import {
  createPasswordResetToken,
  handleSuccessfulLogin,
  handleSuccessfulLogout,
  hashPassword,
} from '~server/utils';
import { SignupInput } from './SignupInput';
import { ChessBoardColor, ColorMode, User, UserRole } from './User';
import { UserPagination } from './UserPagination';

@Resolver(of => User)
export class UserResolver {
  // ---------- me ---------- //
  @Query(returns => User, { nullable: true })
  async me(@Context() { user }: GraphQLContext) {
    if (!user) return null;
    return prisma.user.findUnique({
      where: { id: user.id },
    });
  }

  // ---------- users ---------- //
  @Authorized('ADMIN')
  @Query(returns => [User])
  async users(@Args() { take, skip }: UserPagination) {
    return prisma.user.findMany({
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    });
  }

  // ---------- signup ---------- //
  @Mutation(returns => User)
  async signup(@Arg('data') { email, name, password }: SignupInput) {
    // Normalize email and validate it.
    const normalizedEmail = email.trim().toLowerCase();
    // Check if there is a user with that email.
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      throw new ApolloError('Email already in use.');
    }
    // Hash the password.
    const hashedPassword = await hashPassword(password);
    // Create the user.
    return prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name,
        role: UserRole.MEMBER,
      },
    });
  }

  // ---------- signin ---------- //
  @Mutation(returns => User)
  async signin(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Context() context: GraphQLContext,
  ) {
    // Check if there is a user with that email.
    const user = await requireUserByEmail(email);
    // Check if the password is correct.
    await requireValidPassword(password, user.password);
    // Set the user logged in.
    await handleSuccessfulLogin(user, context);
    // Return the user.
    return user;
  }

  // ---------- signout ---------- //
  @Authorized()
  @Mutation(returns => User, { nullable: true })
  async signout(@Context() context: GraphQLContext) {
    // Remove user login token from cookie.
    handleSuccessfulLogout(context);
    return null;
  }

  // ---------- recoverPassword ---------- //
  @Mutation(returns => User)
  async recoverPassword(@Arg('email') email: string) {
    // Check if there is a user with that email.
    const user = await requireUserByEmail(email);
    // Set a reset token and expiry on that user
    const {
      token: resetToken,
      expires: resetTokenExpiry,
    } = await createPasswordResetToken();

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });
    // Email them the reset token.
    await sendRecoveryEmail({
      to: user.email,
      resetToken,
    });
    // Nothing is returned.
    return user;
  }

  // ---------- resetPassword ---------- //
  @Mutation(returns => User)
  async resetPassword(
    @Arg('resetToken') resetToken: string,
    @Arg('password') password: string,
    @Arg('confirmPassword') confirmPassword: string,
    @Context() context: GraphQLContext,
  ) {
    // Make sure the passwords match.
    requirePasswordsMatch(password, confirmPassword);
    // Find out the reset token is valid.
    const user = await prisma.user.findFirst({
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
    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: {
        password: newPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    // Set the user logged in.
    await handleSuccessfulLogin(user, context);
    // Return the user.
    return updatedUser;
  }

  // ---------- updateUserInfo ---------- //
  @Authorized()
  @Mutation(returns => User)
  async updateUserInfo(
    @Arg('email') email: string,
    @Arg('name') name: string,
    @Context() context: GraphQLContext,
  ) {
    // Find requested user and update permissions.
    return prisma.user.update({
      where: { id: context.user!.id },
      data: { email, name },
    });
  }

  // ---------- updatePassword ---------- //
  @Authorized()
  @Mutation(returns => User)
  async updatePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('password') password: string,
    @Arg('confirmPassword') confirmPassword: string,
    @Context() context: GraphQLContext,
  ) {
    // Make sure the passwords match.
    requirePasswordsMatch(password, confirmPassword);
    // Check if the password is correct.
    // `contet.user!` is used because @Authorized ensures presence of user payload.
    const user = await requireUserById(context.user!.id);
    // Check if the old password is correct.
    await requireValidPassword(oldPassword, user.password);
    // Hash the new password.
    const hashedPassword = await hashPassword(password);
    // await requireValidPassword(password, user.password);
    // Find requested user and update permissions.
    return prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  // ---------- updateColorMode ---------- //
  @Authorized()
  @Mutation(returns => User)
  async updateColorMode(
    @Arg('colorMode', type => ColorMode) colorMode: ColorMode,
    @Context() context: GraphQLContext,
  ) {
    // Check if the requestor has right permissions.
    return prisma.user.update({
      where: { id: context.user!.id },
      data: { colorMode },
    });
  }

  // ---------- updateChessSettings ---------- //
  @Authorized()
  @Mutation(returns => User)
  async updateChessSettings(
    @Arg('chessAutoQueen') chessAutoQueen: boolean,
    @Arg('chessBoardColor', type => ChessBoardColor)
    chessBoardColor: ChessBoardColor,
    @Arg('chessShowLegal') chessShowLegal: boolean,
    @Arg('chessShowRecent') chessShowRecent: boolean,
    @Context() context: GraphQLContext,
  ) {
    // Check if the requestor has right permissions.
    return prisma.user.update({
      where: { id: context.user!.id },
      data: {
        chessAutoQueen,
        chessBoardColor,
        chessShowLegal,
        chessShowRecent,
      },
    });
  }

  // ---------- updateUserRole ---------- //
  @Authorized('ADMIN')
  @Mutation(returns => User)
  async updateUserRole(
    @Arg('id') id: number,
    @Arg('role', type => UserRole) role: UserRole,
    @Context() context: GraphQLContext,
  ) {
    // Find requested user and update permissions.
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}

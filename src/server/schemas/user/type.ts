/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Authorized,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

// -------- Enum: User role -------- //
export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'Role',
  description: 'User roles to control access to contents.',
});

// -------- Enum: Color mode -------- //
export enum ColorMode {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

registerEnumType(ColorMode, {
  name: 'ColorMode',
  description: `User preferred app's theme color.`,
});

// -------- Enum: Chess board color -------- //
export enum ChessBoardColor {
  ARCTIC = 'ARCTIC',
  GOLDEN = 'GOLDEN',
  LOYAL = 'LOYAL',
}

registerEnumType(ChessBoardColor, {
  name: 'ChessBoardColor',
  description: 'User preferred chess board color.',
});

// -------- Type: User -------- //
@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field(type => String)
  email: string;

  @Field(type => String)
  password: string;

  @Field(type => String)
  name: string;

  @Field(type => UserRole, { defaultValue: UserRole.MEMBER })
  role: UserRole;

  @Authorized('ADMIN')
  @Field(type => Date)
  createdAt: Date;

  @Authorized('ADMIN')
  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Boolean, { defaultValue: false })
  verified: boolean;

  @Field(type => ColorMode, { nullable: true })
  colorMode: ColorMode;

  @Field(type => Boolean, { nullable: true })
  chessAutoQueen: boolean;

  @Field(type => ChessBoardColor, { nullable: true })
  chessBoardColor: ChessBoardColor;

  @Field(type => Boolean, { nullable: true })
  chessShowLegal: boolean;

  @Field(type => Boolean, { nullable: true })
  chessShowRecent: boolean;

  @Field(type => Boolean)
  resetToken?: string;

  @Field({ nullable: true })
  resetTokenExpiry?: number;
}

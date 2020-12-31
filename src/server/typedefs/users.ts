import { USER_ROLES } from '../constants';

/** User type */
export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  resetToken?: string;
  resetTokenExpiry?: number;
};

/** Logged-in user payload. */
export type AuthUser = Pick<
  User,
  'id' | 'email' | 'name' | 'role' | 'verified'
>;

/** User credentials payload stored in cookies. */
export type UserAccessPayload = Pick<User, 'id'>;

/** Possible values of user roles.  */
export type UserRole = ArrayElement<typeof USER_ROLES>;

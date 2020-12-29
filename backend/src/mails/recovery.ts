import { withTemplate } from './template';

export const createRecoveryEmail = ({
  resetToken,
}: {
  resetToken: string;
}): {
  title: string;
  body: string;
} => ({
  title: 'Your Password Reset Token',
  body: withTemplate(
    `Your Password Reset Token is here! <a href="${process.env.CLIENT_ENDPOINT}/reset?resetToken=${resetToken}">
    Click Here to Reset</a>`,
  ),
});

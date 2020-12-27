import { withTemplate } from './template';
import environment from '~/server/environment';

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
    `Your Password Reset Token is here! <a href="${environment.client.endpoint}/reset?resetToken=${resetToken}">
    Click Here to Reset</a>`,
  ),
});

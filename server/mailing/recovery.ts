import dedent from 'dedent';

import { transport } from './transport';
import { withTemplate } from './withTemplate';

interface RecoveryMailOptions {
  to: string;
  resetToken: string;
}

export const sendRecoveryEmail = ({
  to,
  resetToken,
}: RecoveryMailOptions): Promise<void> => {
  const message = dedent`
    Your Password Reset Token is here!
    <a href="${process.env.ENDPOINT}/reset?resetToken=${resetToken}">
      Click Here to Reset
    </a>
  `;

  return transport.sendMail({
    from: process.env.MAIL_SENDER,
    to,
    subject: 'Your Password Reset Token',
    html: withTemplate(message),
  });
};

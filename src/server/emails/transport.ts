import nodemailer from 'nodemailer';
import environment from '~/server/environment';

export const transport = nodemailer.createTransport({
  host: environment.mail.host,
  port: environment.mail.port,
  auth: {
    user: environment.mail.username,
    pass: environment.mail.password,
  },
});

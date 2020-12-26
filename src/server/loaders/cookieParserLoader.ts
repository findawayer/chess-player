import cookieParser from 'cookie-parser';
import { Express } from 'express';
import jwt from 'jsonwebtoken';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

import environment from '~/environment';

export const cookieParserLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
): void => {
  if (!settings) {
    throw new Error(`Unable to find Express app.`);
  }
  // Get previously created express app.
  const expressApp: Express = settings.getData(environment.server.expressKey);
  // Parse cookie and populate it to req.cookies.
  expressApp.use(cookieParser());
  // Decode the JSONWebtoken from cookie so we can get the user Id on each request
  expressApp.use((req, _res, next) => {
    const { token } = req.cookies;
    if (token) {
      const decoded = jwt.verify(token, process.env.APP_SECRET) as {
        userId: string;
      };
      // put the userId onto the req for future requests to access
      req.userId = decoded.userId;
    }
    next();
  });
};

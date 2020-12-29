import cookieParser from 'cookie-parser';
import express from 'express';
import * as jwt from 'jsonwebtoken';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
): void => {
  // Create express app.
  const expressApp = express();
  // Parse cookie and populate it to req.cookies.
  expressApp.use(cookieParser());
  // Decode the JSONWebtoken from cookie so we can get the user Id on each request
  expressApp.use((req, _res, next) => {
    const { accessToken } = req.cookies;
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.APP_SECRET) as {
        userId: string;
      };
      // put the userId onto the req for future requests to access
      req.userId = decoded.userId;
    }
    next();
  });
  // Run the app to listen on given port.
  expressApp.listen(process.env.SERVER_PORT);
  // Cache the created app as the microframework's internal data.
  settings.setData('expressServer', expressApp);
};

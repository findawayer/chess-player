import cors from 'cors';
import { Express } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

import environment from '~/environment';

export const corsLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
): void => {
  if (!settings) {
    throw new Error(`Unable to find Express app.`);
  }
  // Get previously created express app.
  const expressApp: Express = settings.getData(environment.server.expressKey);
  // Setup CORS policy.
  expressApp.use(
    cors({
      credentials: true,
      origin: environment.server.path,
    }),
  );
};

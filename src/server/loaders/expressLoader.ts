import express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

import environment from '~/environment';

export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined,
): void => {
  // Create express app.
  const app = express();
  // Run the app to listen on given port.
  app.listen(environment.server.port);
  // Cache the created app as the microframework's internal data.
  settings.setData(environment.server.expressKey, app);
};

import { bootstrapMicroframework } from 'microframework';

// Load aliases map BEFORE local imports to let `ts-node-dev` package handle module aliases.
// Required for `yarn server:dev` script.
// issue: https://github.com/whitecolor/ts-node-dev/issues/95#issuecomment-549762100
import '../../config/aliases';

import logger from '~/devtools/logger';
import environment from '~/environment';
import { apolloLoader } from './loaders/apolloLoader';
import { cookieParserLoader } from './loaders/cookieParserLoader';
import { corsLoader } from './loaders/corsLoader';
import { expressLoader } from './loaders/expressLoader';
import { prismaLoader } from './loaders/prismaLoader';

// Initiate the server
bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [
    prismaLoader,
    expressLoader,
    apolloLoader,
    cookieParserLoader,
    corsLoader,
  ],
})
  .then(() =>
    logger.info(
      `You Apollo server is ready at: ${environment.server.path}/graphql`,
    ),
  )
  .catch(error => logger.error(`Server has crashed: ${error}`));

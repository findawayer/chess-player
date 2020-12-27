import { bootstrapMicroframework } from 'microframework';

// Load aliases map BEFORE local imports
import '../moduleAlias';

// Then aliased imports can be correctly resolved.
import logger from '~/devtools/logger';
import environment from './environment';
import { apolloLoader } from './loaders/apolloLoader';
import { expressLoader } from './loaders/expressLoader';
import { prismaLoader } from './loaders/prismaLoader';

// Initiate the server
bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [prismaLoader, expressLoader, apolloLoader],
})
  .then(() =>
    logger.info(
      `You Apollo server is ready at: ${environment.server.endpoint}/graphql`,
    ),
  )
  .catch(error => logger.error(`Server has crashed: ${error}`));

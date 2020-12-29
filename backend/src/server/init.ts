import { bootstrapMicroframework } from 'microframework';

import logger from '~/devtools/logger';
import { apolloLoader } from './loaders/apolloLoader';
import { expressLoader } from './loaders/expressLoader';
import { prismaLoader } from './loaders/prismaLoader';

// Initiate the server
export default function init() {
  bootstrapMicroframework({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [prismaLoader, expressLoader, apolloLoader],
  })
    .then(() =>
      logger.info(
        `You Apollo server is ready at: ${process.env.SERVER_ENDPOINT}`,
      ),
    )
    .catch(error => logger.error(`Server has crashed: ${error}`));
}
